const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new TelegramBot(token, { polling: false });
const sendMsg = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    await bot.sendMessage(chatId, message);
    return res.status(200).json({ status: "Message sent" });
  } catch (error) {
    console.error("Telegram error:", error);
    // return res.status(500).json({ error: "Failed to send message" });
  }
};
module.exports = sendMsg;
