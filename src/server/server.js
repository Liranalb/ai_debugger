const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const promptGenerator = (code, logs) => {
    console.log("Building a prompt from the code and logs");
};

const promptResponse = (generatedPrompt) => {
    console.log('Sends the prompt to gpt api');
};

const responseData = (promptResponse) => {
    console.log('parse response object before sending it back');
};

app.post('/', (req, res) => {
    const { code, logs } = req.body;

    const generatedPrompt = promptGenerator(code, logs);
    const promptResponse = promptHandler(generatedPrompt);
    const responseData = promptHandler(promptResponse);

    const response = {
        responseData,
        createdAt: new Date().toISOString(),
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});