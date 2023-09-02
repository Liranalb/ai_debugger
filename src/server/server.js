const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { promptGenerator, postPrompt } = require('./serverUtils');
require('dotenv').config(); // Load environment variables from a .env file
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.DEV_PORT || 3001; // Get port from environment variables

app.post('/post', async (req, res, next) => {
    try {
        const { code, logs } = req.body;
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
        next(error);
    }   
});

app.use((err, req, res, next) => {
    console.error(err);
    const errorMessage = "Internal Server Error";
    const response = {
        error: {
            message: errorMessage,
            details: err.message
        }
    };
    res.status(500).json(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
