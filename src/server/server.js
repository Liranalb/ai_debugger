const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const prompts = require('./promptStrings.json');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const promptGenerator = (code, logs) => {
    if(!code || !logs)
        throw new Error("Code or Logs cannot be empty!");
    const prompt = prompts.act.senior.concat(prompts.preCodePrompt, code, prompts.preLogPrompt, logs); 
    return prompt;
};

const promptResponse = (generatedPrompt) => {
    return 'Sends the prompt to GPT API';
};

const parseResponse = (promptResponse) => {
    return 'This is a parsed response from the backend...';
};

app.get('/', (req, res) => {
    res.send('Hi!')
})

app.post('/post', (req, res, next) => {
    try {
        const { code, logs } = req.body;
        const prompt = promptGenerator(code, logs);
        const gptResponse = promptResponse(prompt);
        const responseData = parseResponse(gptResponse);

        const response = {
            response: responseData,
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