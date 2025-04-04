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
const config = require("./configs/config.json");

const router = require("./routes/router");
const authRouter = require("./routes/authRouter");
const tokensRouter = require("./routes/tokensRouter");
const app = express();
const { PORT } = process.env || 3000;

// CORS configuration is critical for handling cross-origin requests and cookies
// Ensure all client domains are listed in origin array for proper cookie handling
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://pipeline-fittings-store-client.vercel.app",
  "https://www.pipeline-fittings-store-client.vercel.app",
  "https://pipeline-fittings-store-client.vercel.app",
];

// Add CLIENT_URL from environment if it exists
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const corsConfig = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 3600
};

app.use(cors(corsConfig));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Get domain from environment or use default based on environment
const getDomain = () => {
  if (process.env.VERCEL_URL) {
    return `.vercel.app`;
  }
  if (process.env.COOKIE_DOMAIN && process.env.COOKIE_DOMAIN !== '.') {
    return process.env.COOKIE_DOMAIN;
  }
  return process.env.NODE_ENV === 'production' ? undefined : 'localhost';
};

app.use(
  session({
    secret: process.env.SESSION_SECRET || config.telegram.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: getDomain(),
      path: '/',
      maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000,
      originalMaxAge: parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000
    }
  })
);

app.options("*", cors(corsConfig));

app.use((err, req, res, next) => {
  if (err.name === "CORSError") {
    console.error('CORS Error:', err.message);
    console.error('Request Origin:', req.headers.origin);
    console.error('Request Method:', req.method);
    console.error('Request Headers:', req.headers);
    return res.status(403).json({
      error: "CORS error",
      message: err.message,
      origin: req.headers.origin,
      allowedOrigins: allowedOrigins,
      allowedMethods: corsConfig.methods,
      allowedHeaders: corsConfig.allowedHeaders
    });
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