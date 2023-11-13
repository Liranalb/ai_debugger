# AI Debugger

The AI Debugger is a web application that helps users debug their code by leveraging the power of AI. Users can submit their code and logs to the application, which will then send them to the OpenAI API. The OpenAI model will analyze the code and logs and provide insights on why the code is not working as expected and suggest possible fixes.

## Features

- Generate responses using the OpenAI GPT-3 model.
- Provide code snippets and corresponding logs to receive informative responses.
- Frontend UI for input and response display.

## Getting Started

### Prerequisites

- Node.js
- npm
- OpenAI API Key (Sign up at [OpenAI](https://platform.openai.com/signup) if you don't have one)

### Installation

⚠️ **Important Usage Notice**: The utilization of the OpenAI API is subject to usage charges. Please ensure you review and understand OpenAI's pricing details before using this application.

1. Clone the repository:

    ```bash
    git clone https://github.com/Liranalb/ai_debugger.git
    ```
2. Navigate to the ai_debugger directory
3. Set an eviroment variable for the OpenAI key.
    ```bash
    export OPENAI_API_KEY='YOUR_API_KEY'
    ```
4. Install project dependencies:
    ```bash
    npm install
    ```
5. Run server:
    ```bash
    npm run dev
    ```
6. Run application
    ```bash
    npm start
    ```
### Usage
1. Access the frontend application in your web browser at http://localhost:3000.
2. App Usage:
Input your code snippet in the provided input box.
Input any relevant logs in the corresponding input box.
Click the "Submit" button.
The AI model will process your code and logs and provide insights on potential issues and fixes.
Review the AI-generated response displayed on the page.
3. Debug and Iterate:
Analyze the insights provided by the AI model.
Implement suggested fixes to your code if necessary.
Continue submitting code and logs to the application to iterate on the debugging process.
## Project Overview
### Frontend
The frontend is crafted with React, providing a user-friendly interface for inputting code and logs. Upon submission, it communicates with the backend API and displays the AI-generated insights.

Key files in the frontend:

- **src/frontend/Home.js**: Core component handling input, submission, and insight rendering.
- **src/frontend/api_config.json**: Configuration settings for API endpoints.

### Backend
The backend employs Node.js and Express to handle API requests and responses. It interacts with the OpenAI API to analyze code and logs and provides informative insights.

Key files in the backend:

- **src/server/server.js**: Express app setup and API endpoints.
- **/config/prompt_config.json**: Defines prompts and actions for guiding code debugging and mentoring
- **.env**: Environment variables including OPENAI_API_KEY and DEV_PORT.

## Contributing
I'm warmly welcome contributions! To contribute, follow these steps:

Fork the repository.
Create a new branch for your feature/FEATURE_NAME: git checkout -b feature/FEATURE_NAME.
Commit your changes.
Push to the branch: git push origin feature/FEATURE_NAME.
Create a pull request.

