const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const promptGenerator = (code, logs) => {
    return "Building a prompt from the code and logs";
};

const promptResponse = (generatedPrompt) => {
    return 'Sends the prompt to gpt api';
};

const pasrseResponse = (promptResponse) => {
    return 'parse response object before sending it back';
};

app.get('/', (req, res) => {
    res.send('Hi!')
})

app.post('/post', (req, res) => {
    const { code, logs } = req.body;
    const prompt = promptGenerator(code, logs);
    const gptResponse = promptResponse(prompt);
    const responsData = pasrseResponse(gptResponse);

    const response = {
        response: responsData,
        createdAt: new Date().toISOString()
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});