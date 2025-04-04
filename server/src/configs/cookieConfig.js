const jwtConfig = require("./jwtConfig");

// Helper function to convert JWT time string to milliseconds
const convertJwtTimeToMs = (timeString) => {
  const units = {
    s: 1000, // seconds to ms
    m: 60 * 1000, // minutes to ms
    h: 60 * 60 * 1000, // hours to ms
    d: 24 * 60 * 60 * 1000, // days to ms
  };

  const match = timeString.match(/^(\d+)([smhd])$/);
  if (!match) {
    console.warn(
      `Invalid time format: ${timeString}, defaulting to 7 days. Expected format: number followed by s/m/h/d (e.g., 30m, 24h, 7d)`
    );

    return 7 * 24 * 60 * 60 * 1000; // Default to 7 days in ms
  }

  const value = parseInt(match[1], 10);
  if (isNaN(value)) {
    console.error(
      `Failed to parse time value: ${match[1]} is not a valid number`
    );
    return 7 * 24 * 60 * 60 * 1000; // Default to 7 days in ms
  }
  const unit = match[2];

  if (!units[unit]) {
    console.error(`Invalid time unit: ${unit}. Must be one of: s, m, h, d`);
    return 7 * 24 * 60 * 60 * 1000; // Default to 7 days in ms
  }
  return value * units[unit];
};

// Helper function to determine if the application is running in a local environment
const isLocalEnvironment = () => {
  return !process.env.COOKIE_DOMAIN || 
         process.env.COOKIE_DOMAIN === 'localhost' || 
         process.env.COOKIE_DOMAIN.includes('127.0.0.1') || 
         process.env.COOKIE_DOMAIN === '.';
};

// Improved helper function to determine if running on Vercel
const isVercelEnvironment = () => {
  // Check all possible Vercel environment variables
  return Boolean(
    process.env.VERCEL || 
    process.env.VERCEL_URL || 
    process.env.VERCEL_REGION || 
    process.env.VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_GIT_COMMIT_SHA
  );
};

// Get the appropriate domain for cookies
const getDomain = () => {
  console.log('Determining cookie domain...');
  
  // For Vercel deployment
  if (isVercelEnvironment()) {
    // For Vercel production, use the client domain directly
    console.log('Vercel environment detected, using vercel.app domain');
    return 'pipeline-fittings-store-client.vercel.app';
  }
  
  // For production with custom domain
  if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
    // Don't use a single dot as domain
    if (process.env.COOKIE_DOMAIN === '.') {
      console.warn('Invalid domain "." specified in COOKIE_DOMAIN, using undefined instead');
      return undefined;
    }
    console.log(`Using production domain from env: ${process.env.COOKIE_DOMAIN}`);
    return process.env.COOKIE_DOMAIN;
  }
  
  // For local development
  if (isLocalEnvironment()) {
    console.log('Local environment detected, using undefined domain');
    return undefined; // No domain for localhost
  }
  
  console.log(`Using default domain from env: ${process.env.COOKIE_DOMAIN || 'undefined'}`);
  return process.env.COOKIE_DOMAIN;
};

// Get the domain for cookies
const domain = getDomain();

// For cross-domain cookie sharing in production environments,
// sameSite must be set to 'none' and secure must be true.
const cookieConfig = 
  process.env.NODE_ENV === "production" || isVercelEnvironment()
      ? {
          httpOnly: true,
          maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
          sameSite: "none", // Always use 'none' in production for cross-domain cookies
          secure: true, // Must be true when sameSite is 'none'
          path: "/",
          domain: isVercelEnvironment() ? 'pipeline-fittings-store-client.vercel.app' : domain,
        }
    : {
        httpOnly: true,
        maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
        sameSite: "lax",
        secure: false, // For localhost, secure must be false when not using HTTPS
        path: "/",
        domain: undefined, // For localhost, domain must be undefined
      };

// Validate that maxAge is a positive number
if (typeof cookieConfig.maxAge !== "number" || cookieConfig.maxAge <= 0) {
  console.warn("Invalid cookie maxAge value, defaulting to 7 days");
  cookieConfig.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
}

// Log cookie configuration for debugging purposes
console.log("Cookie configuration:", {
  ...cookieConfig,
  domain: cookieConfig.domain || 'undefined',
  environment: process.env.NODE_ENV || "development",
  isVercel: isVercelEnvironment(),
});

module.exports = cookieConfig;