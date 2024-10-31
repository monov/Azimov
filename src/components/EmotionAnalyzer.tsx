import React, { useState } from "react";
import { Brain, Send, Loader2, Sparkles } from "lucide-react";

const analyzeEmotion = async (text: string, retries = 3) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Analyze the emotions in this text and reply with ({joy, sadness, anger, fear, surprise} : {how certain you are from 0 to 1}): "${text}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return analyzeEmotion(text, retries - 1);
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const emotionAnalysis = data.choices[0].message.content;

    const emotionScores = emotionAnalysis.split(",").map((item) => {
      const [emotion, score] = item.split(":").map((str) => str.trim());
      return { emotion, score: parseFloat(score) };
    });

    return emotionScores.sort((a, b) => b.score - a.score)[0];
  } catch (error) {
    console.error("Error fetching emotion analysis:", error);
    throw new Error("API Error");
  }
};

const EmotionAnalyzer: React.FC = () => {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState<{
    emotion: string;
    score: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeEmotion(text);
      setEmotion(result);
    } catch (error) {
      console.error("Error analyzing emotion:", error);
    }
    setIsAnalyzing(false);
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      joy: "text-yellow-500",
      sadness: "text-blue-500",
      anger: "text-red-500",
      fear: "text-purple-500",
      surprise: "text-green-500",
    };
    return colors[emotion] || "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Emotion Analyzer
          </h1>
          <p className="text-gray-600">
            Discover the emotional tone of your text
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Analyze Emotion
              </>
            )}
          </button>
        </div>

        {emotion && (
          <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Analysis Result
              </h2>
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex items-center justify-center">
              <div
                className={`text-center ${getEmotionColor(emotion.emotion)}`}
              >
                <p className="text-3xl font-bold capitalize mb-2">
                  {emotion.emotion}
                </p>
                <p className="text-sm text-gray-600">
                  Confidence: {(emotion.score * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionAnalyzer;
