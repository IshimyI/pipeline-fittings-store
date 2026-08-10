require("dotenv").config();
const express = require("express");
const multer = require("multer");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const router = require("./routes/router");
const authRouter = require("./routes/authRouter");
const tokensRouter = require("./routes/tokensRouter");
const app = express();
const PORT_HTTP = process.env.PORT_HTTP || 80;
const PORT_HTTPS = process.env.PORT_HTTPS || 443;

const corsConfig = {
  origin: [
    "https://krioarmatura.com",
    "https://www.krioarmatura.com",
    "https://krio-armatura.ru",
    "https://www.krio-armatura.ru",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://pipeline-fittings-store-client.vercel.app",
    "https://www.pipeline-fittings-store-client.vercel.app",
    "pipeline-fittings-store-client.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};
app.use(cors(corsConfig));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public/dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "None",
      secure: true,
      path: "/",
      maxAge: 12 * 60 * 60 * 1000,
    },
  })
);
app.options("*", cors(corsConfig));
app.use((err, req, res, next) => {
  if (err.name === "CORSError") {
    res.status(403).json({ error: "CORS error", message: err.message });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ error: "Ошибка загрузки файла", message: err.message });
  }
  next(err);
});
app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/tokens", tokensRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

try {
  const sslPath = path.join(__dirname, "../configs/ssl");
  const keyPath = path.join(sslPath, "private.key");
  const certPath = path.join(sslPath, "certificate.crt");

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    const httpsOptions = {
      key: fs.readFileSync(keyPath, "utf8"),
      cert: fs.readFileSync(certPath, "utf8"),
    };

    https.createServer(httpsOptions, app).listen(PORT_HTTPS, () => {
      console.log(`✅ HTTPS сервер запущен на порту ${PORT_HTTPS}`);
    });

    const http = require("http");
    const redirectApp = express();
    redirectApp.use((req, res) => {
      const host = (req.headers.host || "krioarmatura.com").split(":")[0];
      res.redirect(`https://${host}${req.url}`);
    });

    http.createServer(redirectApp).listen(PORT_HTTP, () => {
      console.log(`🔁 HTTP сервер редиректит на HTTPS (порт ${PORT_HTTP})`);
    });
  } else {
    console.warn("❌ SSL certificates not found. Starting in HTTP mode only.");
    app.listen(PORT_HTTP, () => {
      console.log(`⚠️ HTTP сервер запущен на порту ${PORT_HTTP} (без SSL)`);
    });
  }
} catch (error) {
  console.error("Server initialization error:", error);
  process.exit(1);
}

module.exports = app;
