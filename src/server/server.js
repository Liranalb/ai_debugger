const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./apiReqConfig.json'); // Load OpenAI configuration
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config(); // Load environment variables from a .env file

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.DEV_PORT; // Get port from environment variables

// generates the prompt for OpenAI based on code and logs
const promptGenerator = (code, logs) => {
    if (!code || !logs)
        throw new Error("Code or Logs cannot be empty!");

    // Concatenate prompts from configuration string and user inputs
    const prompt = config.ACT.STEP_BY_STEP.concat(config.PRE_CODE_PROMPT, code, config.PRE_LOG_PROMPT, logs);
    return prompt;
};

// Send a prompt to OpenAI and get a completion
const postPrompt = async (prompt) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY, // Get API key from environment variables
    });
    const openai = new OpenAIApi(configuration);

    // Create a chat completion request to OpenAI API
    const response = await openai.createChatCompletion({
        model: config.GPT.MODEL,
        messages: [{"role":config.ROLE,"content":prompt}],
        temperature: config.GPT.TEMPERATURE,
        max_tokens: config.GPT.MAX_TOKENS,
        top_p: config.GPT.TOP_P,
        frequency_penalty: config.GPT.FREQUENCY_PENALTY,
        presence_penalty: config.GPT.PRESENCE_PENALTY,
    }); 

    return response.data.choices[0].message.content;
};

app.post('/post', async (req, res) => {
    try {
        const { code, logs } = req.body;
        if (!code || !logs) {
            throw new Error("Code or Logs cannot be empty!");
        }

        const prompt = promptGenerator(code, logs); // Generate the prompt for OpenAI
        const gptResponse = await postPrompt(prompt); // Get completion from OpenAI
        
        const response = {
            response: gptResponse,
            createdAt: new Date().toISOString()
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        const errorMessage = "Something went wrong...\n";
        const response = { // The error message will be sent back to the user
            response: errorMessage + error,
            createdAt: new Date().toISOString()
        };
        res.status(500).json(response);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
