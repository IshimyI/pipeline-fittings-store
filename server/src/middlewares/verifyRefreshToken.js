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
      !refreshToken.match(/^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_]*$/)
    ) {
      throw new TokenError("Invalid token format");
    }

    // Verify token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Double check expiration
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
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
    });

    // Handle specific error types
    if (error.name === "TokenError") {
      res.status(401).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Token expired" });
    } else if (error.name === "SessionError") {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }

    res.clearCookie("refreshToken", cookieConfig);
  }
}

module.exports = verifyRefreshToken;
