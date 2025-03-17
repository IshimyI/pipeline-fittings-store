const TelegramBot = require("node-telegram-bot-api");
const config = require("../configs/config.json");
class TelegramBotService {
  constructor() {
    this.bot = new TelegramBot(config.telegram.token, { polling: true });
    this.initializeHandlers();
  }
  initializeHandlers() {
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        "Добро пожаловать! Я бот магазина трубопроводной арматуры. Чем могу помочь?"
      );
    });
    this.bot.onText(/\/contacts/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        "Наши контакты:\n" +
          "Телефон: +7 (495) 123-45-67\n" +
          "Email: info@krioarmatura.ru\n" +
          "Адрес: Москва, ул. Инновационная, д. 10"
      );
    });
    this.bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      if (
        msg.text.toLowerCase().includes("цена") ||
        msg.text.toLowerCase().includes("стоимость")
      ) {
        this.bot.sendMessage(
          chatId,
          "Для получения актуальных цен, пожалуйста, свяжитесь с нашими менеджерами по телефону или email."
        );
      }
    });
  }
}
module.exports = TelegramBotService;
