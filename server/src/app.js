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
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : []),
  process.env.CLIENT_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

// Add CLIENT_URL from environment if it exists
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const corsConfig = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);

    // Allow all Vercel domains or explicitly allowed origins
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With",
  ],
  exposedHeaders: ["Set-Cookie", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

app.use(cors(corsConfig));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Get domain from environment or use default based on environment
const getDomain = () => {
  // For Vercel environments
  if (process.env.VERCEL || process.env.VERCEL_URL) {
    console.log("Vercel environment detected for session cookie");
    return "pipeline-fittings-store-client.vercel.app";
  }

  // For production with custom domain
  if (
    process.env.NODE_ENV === "production" &&
    process.env.COOKIE_DOMAIN &&
    process.env.COOKIE_DOMAIN !== "."
  ) {
    console.log(
      `Using production domain for session cookie: ${process.env.COOKIE_DOMAIN}`
    );
    return process.env.COOKIE_DOMAIN;
  }

  // Never use a single dot as domain
  if (process.env.COOKIE_DOMAIN === ".") {
    console.warn(
      'Invalid domain "." specified for session cookie, using undefined'
    );
    return undefined;
  }

  // Default for development
  if (process.env.NODE_ENV !== "production") {
    console.log(
      "Development environment detected for session cookie, using undefined domain"
    );
    return undefined;
  }

  return process.env.COOKIE_DOMAIN;
};

const sessionDomain = getDomain();
console.log(`Session cookie domain: ${sessionDomain || "undefined"}`);

app.use(
  session({
    secret: process.env.SESSION_SECRET || config.telegram.secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      domain: sessionDomain,
      path: "/",
      maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000,
      originalMaxAge:
        parseInt(process.env.COOKIE_MAX_AGE) || 24 * 60 * 60 * 1000,
    },
  })
);

app.options("*", cors(corsConfig));

// CORS error handler middleware
app.use((err, req, res, next) => {
  if (err.name === "CORSError" || err.message?.includes("CORS")) {
    console.error("CORS Error:", err.message);
    console.error("Request Origin:", req.headers.origin);
    console.error("Request Method:", req.method);
    console.error("Request Headers:", JSON.stringify(req.headers));
    console.error(
      "Is Vercel Origin:",
      req.headers.origin?.endsWith(".vercel.app") || false
    );
    console.error("Allowed Origins:", allowedOrigins);
    console.error("Credentials:", req.headers?.credentials);
    console.error(
      "Access-Control-Request-Headers:",
      req.headers["access-control-request-headers"]
    );
    console.error(
      "Access-Control-Request-Method:",
      req.headers["access-control-request-method"]
    );
    console.error("CORS Config:", JSON.stringify(corsConfig, null, 2));

    return res.status(403).json({
      error: "CORS error",
      message: err.message,
      origin: req.headers.origin,
      allowedOrigins: allowedOrigins,
      allowedMethods: corsConfig.methods,
      allowedHeaders: corsConfig.allowedHeaders,
    });
  }
  next(err);
});

// Multer error handler middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ error: "Ошибка загрузки файла", message: err.message });
  }
  next(err);
});

// Cookie error handler middleware
app.use((err, req, res, next) => {
  if (err.message?.includes("cookie") || err.message?.includes("Cookie")) {
    console.error("Cookie Error:", err.message);
    console.error("Cookie Headers:", req.headers.cookie);

    // Continue processing the request despite cookie error
    return next();
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
