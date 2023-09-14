const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./logger/logger_dev');
//const logger = require('./logger/logger_prod');
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
        logger.info('Post successful');
    } catch (error) {
        next(error);
    }   
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    const statusCode = err.response.status || 500;
    res.status(statusCode).json(errorResponse);
});

app.listen(port, () => {
    logger.info('Server is running on port: ' + port);
});
