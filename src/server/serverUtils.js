const { Configuration, OpenAIApi } = require("openai");
const config = require('../config/apiReqConfig.json'); // Load OpenAI configuration

// generates the prompt for OpenAI based on code and logs
const promptGenerator = (code, logs) => {
    if (!code || !logs)
        throw new Error("Code or Logs cannot be empty!");

    // Concatenate prompts from configuration string and user inputs
    return config.ACT.STEP_BY_STEP.concat(config.PRE_CODE_PROMPT, code, config.PRE_LOG_PROMPT, logs);
    
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

module.exports = {
    promptGenerator,
    postPrompt,
};