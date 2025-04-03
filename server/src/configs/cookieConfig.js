const jwtConfig = require("./jwtConfig");

// Configuration for cross-domain authentication cookies
// These settings are crucial for proper JWT token handling across different domains
const cookieConfig = process.env.NODE_ENV === 'production' 
  ? {
    httpOnly: true,
    maxAge: jwtConfig.refresh.expiresIn,
    sameSite: "none",
    secure: true,
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined,
  }
  : {
    httpOnly: true,
    maxAge: jwtConfig.refresh.expiresIn,
    sameSite: "lax",
    secure: false,
    path: "/",
  };

module.exports = cookieConfig;
