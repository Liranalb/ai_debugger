const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./serverConfig.json');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const promptGenerator = (code, logs) => {
    if (!code || !logs)
        throw new Error("Code or Logs cannot be empty!");
    const prompt = config.act.senior.concat(config.preCodePrompt, code, config.preLogPrompt, logs);
    return prompt;
};

const postPrompt = async (prompt) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: config.gpt.model,
        temperature: config.gpt.temperature,
        max_tokens: config.gpt.max_tokens,
        top_p: config.gpt.top_p,
        frequency_penalty: config.gpt.frequency_penalty,
        presence_penalty: config.gpt.presence_penalty,
    });

    return response;
};

const parseResponse = (promptResponse) => {
    return 'This is a parsed response from the backend...';
};

app.post('/post', async (req, res, next) => {
    try {
        const { code, logs } = req.body;
        const prompt = promptGenerator(code, logs);
        const gptResponse = await postPrompt(prompt);
        const parsedResponse = parseResponse(gptResponse);

        const response = {
            response: parsedResponse,
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