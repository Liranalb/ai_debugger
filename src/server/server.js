const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())

const promptGenerator = (code, logs) => {
    return "Building a prompt from the code and logs";
};

const promptResponse = (generatedPrompt) => {
    return 'Sends the prompt to gpt api';
};

const pasrseResponse = (promptResponse) => {
    return 'This is a parsed response from the backend...';
};

app.get('/', (req, res) => {
    res.send('Hi!')
})

app.post('/post', (req, res) => {
    try {
        const { code, logs } = req.body;
        const prompt = promptGenerator(code, logs);
        const gptResponse = promptResponse(prompt);
        const responsData = pasrseResponse(gptResponse);

        const response = {
            response: responsData,
            createdAt: new Date().toISOString()
        };
        res.json(response);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});