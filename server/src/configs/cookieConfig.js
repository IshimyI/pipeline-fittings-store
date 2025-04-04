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

// Helper function to determine if running on Vercel
const isVercelEnvironment = () => {
  // Debug logging for environment detection
  console.log("Environment variables present:", {
    VERCEL: process.env.VERCEL ? "yes" : "no",
    VERCEL_URL: process.env.VERCEL_URL ? "yes" : "no",
    VERCEL_ENV: process.env.VERCEL_ENV ? "yes" : "no",
    NODE_ENV: process.env.NODE_ENV || "not set",
  });

  return Boolean(
    process.env.VERCEL ||
      process.env.VERCEL_URL ||
      process.env.VERCEL_ENV ||
      process.env.VERCEL_REGION ||
      process.env.NOW_REGION
  );
};

// Configure cookies based on environment
let cookieConfig;

const defaultCookieConfig = {
  httpOnly: true,
  maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
  sameSite: "lax",
  secure: false,
  path: "/",
  domain: undefined,
};


if (process.env.NODE_ENV === "development") {
  // Local development configuration
  cookieConfig = {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: "lax",
    secure: false, // For localhost, secure must be false when not using HTTPS
    path: "/",
    domain: undefined, // For localhost, domain must be undefined
    _domainValidated: true, // Explicit validation flag
  };

  console.log("Using local development cookie configuration");
} else if (isVercelEnvironment()) {
  // Verify VERCEL_URL is available
  if (!process.env.VERCEL_URL) {
    throw new Error(
      "VERCEL_URL environment variable is required when running on Vercel"
    );
  }

  // Vercel-specific configuration
  cookieConfig = {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: "none", // Required for cross-domain cookies
    secure: true, // Required when sameSite is 'none'
    path: "/",
    domain:
      process.env.COOKIE_DOMAIN || "pipeline-fittings-store-client.vercel.app", // Use custom domain or fallback
  };

  console.log("Using Vercel cookie configuration");
} else if (process.env.NODE_ENV === "production") {
  // Non-Vercel production configuration
  cookieConfig = {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: "none", // For cross-domain cookies
    secure: true, // Required when sameSite is 'none'
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined,
  };

  console.log("Using production cookie configuration");
  } else {
  // Default configuration when NODE_ENV is not set or doesn't match expected values
  console.warn("NODE_ENV not set or unrecognized, using default cookie configuration");
  cookieConfig = { ...defaultCookieConfig };
  }

// Ensure cookieConfig is defined
if (!cookieConfig) {
  console.warn("cookieConfig was not properly set, using default configuration");
  cookieConfig = { ...defaultCookieConfig };
}

// Validate that maxAge is a positive number
if (!cookieConfig || typeof cookieConfig.maxAge !== "number" || cookieConfig.maxAge <= 0) {
  console.warn("Invalid cookie maxAge value, defaulting to 7 days");
  cookieConfig.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
}

// Log cookie configuration for debugging purposes
// Log if we're using default configuration
if (cookieConfig === defaultCookieConfig) {
  console.warn("Using default cookie configuration as fallback");
}

console.log("Cookie configuration:", {
  ...cookieConfig,
  domain: cookieConfig.domain || "undefined",
  environment: process.env.NODE_ENV || "development",
  isVercel: isVercelEnvironment() ? "yes" : "no",
});

module.exports = cookieConfig || defaultCookieConfig;
