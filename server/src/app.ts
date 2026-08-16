import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import multer from "multer";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import session from "express-session";
import router from "./routes/router";
import authRouter from "./routes/authRouter";
import tokensRouter from "./routes/tokensRouter";

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
// process.cwd() (not __dirname) on purpose: compiling to dist/ nests this
// file one level deeper than the original plain-JS src/app.js was, so a
// __dirname-relative path here would land inside dist/ instead of at the
// real server/public/dist. cwd is stable across dev (tsx, run from server/)
// and prod (node dist/src/app.js, also launched from server/) either way.
app.use(express.static(path.join(process.cwd(), "public/dist")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 12 * 60 * 60 * 1000,
    },
  })
);
app.options("*", cors(corsConfig));
app.use((err: Error & { name?: string }, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === "CORSError") {
    res.status(403).json({ error: "CORS error", message: err.message });
  }
  next(err);
});
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
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

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public/dist/index.html"));
});

try {
  const sslPath = path.join(process.cwd(), "configs/ssl");
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
    redirectApp.use((req: Request, res: Response) => {
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

export default app;
