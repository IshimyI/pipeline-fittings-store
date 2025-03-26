require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const config = require("./configs/config.json");
const router = require("./routes/router");
const authRouter = require("./routes/authRouter");
const tokensRouter = require("./routes/tokensRouter");
const app = express();
const PORT = process.env.PORT || 3000;

// Конфигурация CORS
const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://pipeline-fittings-store-client.vercel.app",
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

// Middlewares
app.use(cors(corsConfig));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Настройка сессии
app.use(
  session({
    secret: config.telegram.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      path: "/",
    },
  })
);

// Обработка OPTIONS-запросов
app.options("*", cors(corsConfig));
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    return res.status(200).json();
  }
  next();
});

// Роутеры
app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/tokens", tokensRouter);

// Обработчик ошибок CORS
app.use((err, req, res, next) => {
  if (err.name === "CORSError") {
    res.status(403).json({ error: "CORS error", message: err.message });
  }
  next(err);
});

// Запуск сервера (без SSL)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
