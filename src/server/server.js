const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./serverConfig.json');
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = config.PORT;

app.use(bodyParser.json());
app.use(cors());

const promptGenerator = (code, logs) => {
    if (!code || !logs)
        throw new Error("Code or Logs cannot be empty!");
    const prompt = config.ACT.SENIOR.concat(config.PRE_CODE_PROMPT, code, config.PRE_LOG_PROMPT, logs);
    return prompt;
};

const postPrompt = async (prompt) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
        model: config.GPT.MODEL,
        messages: [{"role":"user","content":prompt}],
        temperature: config.GPT.TEMPERATURE,
        max_tokens: config.GPT.MAX_TOKENS,
        top_p: config.GPT.TOP_P,
        frequency_penalty: config.GPT.FREQUENCY_PENALTY,
        presence_penalty: config.GPT.PRESENCE_PENALTY,
    }); 

    return response.data.choices[0].message.content;
};

app.post('/post', async (req, res, next) => {
    try {
        const { code, logs } = req.body;
        const prompt = promptGenerator(code, logs);
        const gptResponse = await postPrompt(prompt);

        const response = {
            response: gptResponse,
            createdAt: new Date().toISOString()
        };
        res.json(response);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});