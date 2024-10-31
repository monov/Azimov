# Emotion Analyzer

## Overview

The Emotion Analyzer is a React application that utilizes the OpenAI API to analyze the emotional tone of input text. It can identify emotions such as joy, sadness, anger, fear, and surprise, providing a confidence score for each emotion detected. This project serves as a useful tool for understanding the emotional context of written communication.

## Features

- Text input for users to enter their content for analysis.
- Emotion analysis using the OpenAI API.
- Display of the most dominant emotion and its confidence score.
- User-friendly interface with animated feedback during the analysis.

## Technologies Used

- React
- TypeScript
- Tailwind CSS (for styling)
- Lucide React (for icons)
- OpenAI API (for emotion analysis)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ````bash
   git clone https://github.com/yourusername/emotion-analyzer.git
   cd emotion-analyzer

2. **Install Dependencies:**
    ```bash
    npm install
    ````

3. **Create .env File:**
   Create a `.env` file in your project's root directory and add your OpenAI API key:

      ```
      VITE_API_KEY=your_api_key_here
      ```

4. **Start Development Server:**

    ```bash
        npm run dev
    ```

5. **Access the App:**
   Open your browser and navigate to `http://localhost:3000`.

# Usage

1. **Enter Text:**
   Input your text in the provided text area.

2. **Analyze Emotion:**
   Click the "Analyze Emotion" button.

3. **View Results:**
   The application will display the dominant emotion detected and its confidence score.

# Limitations

Please note that due to that Im a **POOR STUDENT** that cant afford chatGPT api, I was unable to fully test this application. However, the code is structured to handle API requests and should function correctly with a valid OpenAI API key.
