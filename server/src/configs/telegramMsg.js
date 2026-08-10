require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const relayUrl = process.env.TG_RELAY_URL;
const relaySecret = process.env.TG_RELAY_SECRET;

const sendMsg = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const relayResp = await fetch(relayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Relay-Secret": relaySecret,
      },
      body: JSON.stringify({ token, chatId, text: message }),
    });
    if (!relayResp.ok) {
      throw new Error(`Relay responded ${relayResp.status}`);
    }
    return res.status(200).json({ status: "Message sent" });
  } catch (error) {
    console.error("Telegram error:", error);
    // return res.status(500).json({ error: "Failed to send message" });
  }
};
module.exports = sendMsg;
