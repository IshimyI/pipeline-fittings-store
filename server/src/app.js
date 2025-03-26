require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const session = require("express-session");
const config = require("./configs/config.json");
const router = require("./routes/router");
const authRouter = require("./routes/authRouter");
const tokensRouter = require("./routes/tokensRouter");
const app = express();
const { PORT } = process.env || 3000;

const corsConfig = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://pipeline-fittings-store-client.vercel.app",
    "pipeline-fittings-store-client.vercel.app",
    "https://pipeline-fittings-store-client.vercel.app",
    "postgresql://pipeline_filtings_krioarmatura_user:vrcQfYLKeHfsFQV5abyszkv5zKDrgSQX@dpg-cvc7slbqf0us73ddg460-a.oregon-postgres.render.com/pipeline_filtings_krioarmatura",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsConfig));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: config.telegram.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "Strict",
      secure: true,
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
app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/tokens", tokensRouter);
const path = require("path");
let server;
try {
  const sslPath = path.join(__dirname, "../configs/ssl");
  const keyPath = path.join(sslPath, "private.key");
  const certPath = path.join(sslPath, "certificate.crt");

  if (!fs.existsSync(sslPath)) {
    fs.mkdirSync(sslPath, { recursive: true });
    console.log("Created SSL directory:", sslPath);
  }

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.warn("SSL certificates not found. Starting in HTTP mode.");
    console.warn("Expected files:");
    console.warn(`- ${keyPath}`);
    console.warn(`- ${certPath}`);
    console.warn(
      "To enable HTTPS, place your SSL certificates in the configs/ssl directory."
    );
    server = app.listen(PORT, () => {
      console.log(`HTTP Server running on port ${PORT}`);
    });
  } else {
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
    server = https.createServer(httpsOptions, app);
    server.listen(PORT, () => {
      console.log(`HTTPS Server running on port ${PORT}`);
    });
  }
} catch (error) {
  console.error("Server initialization error:", error);
  process.exit(1);
}
module.exports = app;
