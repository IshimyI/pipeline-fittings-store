const jwtConfig = require("./jwtConfig");

// Helper function to convert JWT time string to milliseconds
const convertJwtTimeToMs = (timeString) => {
  const units = {
    s: 1000,           // seconds to ms
    m: 60 * 1000,      // minutes to ms
    h: 60 * 60 * 1000, // hours to ms
    d: 24 * 60 * 60 * 1000, // days to ms
  };
  
  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) {
    console.warn(`Invalid time format: ${timeString}, defaulting to 7 days. Expected format: number followed by s/m/h/d (e.g., 30m, 24h, 7d)`);

    return 7 * 24 * 60 * 60 * 1000; // Default to 7 days in ms
  }
  
  const value = parseInt(match[1], 10);
  if (isNaN(value)) {
    console.error(`Failed to parse time value: ${match[1]} is not a valid number`);
    return 7 * 24 * 60 * 60 * 1000; // Default to 7 days in ms
  }
  const unit = match[2];
  
  if (!units[unit]) {
    console.error(`Invalid time unit: ${unit}. Must be one of: s, m, h, d`);
    return 7 * 24 * 60 * 60 * 1000; // Default to 7 days in ms
  }
  return value * units[unit];
};

// Configuration for cross-domain authentication cookies
// These settings are crucial for proper JWT token handling across different domains
// Cookie settings control security aspects like cross-site access, SSL requirements,
// and domain-specific behavior for authentication tokens
const domain = process.env.COOKIE_DOMAIN;
if (process.env.NODE_ENV === 'production') {
  if (!domain) {
    throw new Error('COOKIE_DOMAIN environment variable is required in production');
  }
  if (!domain.startsWith('.') && domain.includes('.')) {
    console.warn('Consider using a leading dot in COOKIE_DOMAIN for broader subdomain coverage');
  }
}

const cookieConfig = process.env.NODE_ENV === 'production' 
  ? {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : (process.env.COOKIE_SECURE === 'true'),
    path: "/",
    domain: process.env.COOKIE_DOMAIN,
  }
  : {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN ? 'none' : 'lax',
    secure: false,
    path: "/",
    domain: process.env.COOKIE_DOMAIN || 'localhost'
  };

// Validate that maxAge is a positive number
if (typeof cookieConfig.maxAge !== 'number' || cookieConfig.maxAge <= 0) {
  console.warn('Invalid cookie maxAge value, defaulting to 7 days');
  cookieConfig.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
}

module.exports = cookieConfig;