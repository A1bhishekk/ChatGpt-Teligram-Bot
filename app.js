const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require('openai');

const BOT_TOKEN = '5615643362:AAGJuqISOhro5GURoJejjeq6GOrWF3_xCNA';
const OPENAI_API_KEY = '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';

const config = new Configuration({
    apiKey: OPENAI_API_KEY
})
// console.log(config)

const openai = new OpenAIApi(config)

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello, I'm ChatGpt bot created by Abhi 🐰! How can I help you?");
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    const response = await openai.createCompletion({
        prompt: message,
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    bot.sendMessage(chatId, response.data.choices[0].text);
    // console.log(msg)
    console.log(response.data.choices[0].text)
});
