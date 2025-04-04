const jwt = require("jsonwebtoken");
const cookieConfig = require("../configs/cookieConfig");

require("dotenv").config();

// Custom error classes
class TokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenError";
  }
}

class SessionError extends Error {
  constructor(message) {
    super(message);
    this.name = "SessionError";
  }
}

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new TokenError("No refresh token found");
    }

    // Validate token format
    if (
      typeof refreshToken !== "string" ||
      !refreshToken.match(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_+/=]*$/
      )
    ) {
      throw new TokenError("Invalid token format");
    }

    // Verify token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Double check expiration
    const clockToleranceSeconds = 30;
    if (
      decoded.exp &&
      Date.now() / 1000 >= decoded.exp + clockToleranceSeconds
    ) {
      throw new TokenError("Token has expired");
    }

    // Basic validation of token content
    if (!decoded.user || !decoded.user.id) {
      throw new TokenError("Invalid token payload");
    }

    res.locals.user = decoded.user;
    next();
  } catch (error) {
    // Detailed error logging
    console.error("Token verification failed:", {
      error: error.name,
      message: error.message,
      requestIP: req.ip,
      userAgent: req.headers["user-agent"],
      timestamp: new Date().toISOString(),
      endpoint: req.originalUrl,
      method: req.method,
      cookies: req.cookies ? Object.keys(req.cookies) : [],
      hasCookieHeader: !!req.headers.cookie,
      path: req.path,
      isVercel: process.env.VERCEL || process.env.VERCEL_URL ? "yes" : "no",
      cookieConfig: {
        sameSite: cookieConfig.sameSite,
        secure: cookieConfig.secure,
        domain: cookieConfig.domain || "undefined",
        path: cookieConfig.path,
      },
    });

    try {
      // Clear cookie before sending response
      res.clearCookie("refreshToken", cookieConfig);

      console.log("Cleared invalid refresh token cookie with settings:", {
        sameSite: cookieConfig.sameSite,
        secure: cookieConfig.secure,
        domain: cookieConfig.domain || "undefined",
        path: cookieConfig.path,
      });
    } catch (clearCookieError) {
      console.error(
        "Failed to clear cookie:",
        clearCookieError.message,
        clearCookieError.stack
      );
    }

    // Handle specific error types
    if (error.name === "TokenError") {
      res.status(401).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token", details: error.message });
    } else if (error.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ error: "Token expired", expiredAt: error.expiredAt });
    } else if (error.name === "NotBeforeError") {
      res.status(401).json({ error: "Token not yet active", date: error.date });
    } else if (error.name === "SessionError") {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "Internal server error",
        message: "An unexpected error occurred",
      });
    }
  }
}

module.exports = verifyRefreshToken;
