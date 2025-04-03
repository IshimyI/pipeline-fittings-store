const jwtConfig = require("./jwtConfig");

// Configuration for cross-domain authentication cookies
// These settings are crucial for proper JWT token handling across different domains
const domain = process.env.COOKIE_DOMAIN;
if (process.env.NODE_ENV === 'production' && !domain) {
  throw new Error('COOKIE_DOMAIN environment variable is required in production');
}

const cookieConfig = process.env.NODE_ENV === 'production' 
  ? {
    httpOnly: true,
    maxAge: jwtConfig.refresh.expiresIn,
    sameSite: "lax",
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
