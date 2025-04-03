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
         process.env.COOKIE_DOMAIN.includes('127.0.0.1');
};

// Configuration for cross-domain authentication cookies
// These settings are crucial for proper JWT token handling across different domains
// Cookie settings control security aspects like cross-site access, SSL requirements,
// and domain-specific behavior for authentication tokens

const domain = process.env.COOKIE_DOMAIN;
if (process.env.NODE_ENV === "production") {
  if (!domain) {
    throw new Error(
      "COOKIE_DOMAIN environment variable is required in production"
    );
  }
  if (!domain.startsWith(".") && domain.includes(".")) {
    console.warn(
      "Consider using a leading dot in COOKIE_DOMAIN for broader subdomain coverage and proper cross-domain cookie sharing"
    );
  }
}

// For cross-domain cookie sharing in production environments,
// sameSite must be set to 'none' and secure must be true.
// This is essential for cookies to work between different domains (e.g., API and client)
// For localhost development:
// - secure should be false unless using HTTPS
// - sameSite can be 'lax' for better development experience
// - domain should be undefined for localhost
const cookieConfig = 
  process.env.NODE_ENV === "production"
    ? {
        httpOnly: true,
        maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
        sameSite: "none", // Always use 'none' in production for cross-domain cookies
        secure: true, // Must be true when sameSite is 'none'
        path: "/",
        domain: process.env.COOKIE_DOMAIN,
      }
    : {
        httpOnly: true,
        maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
        sameSite: "lax",
        // For localhost, secure must be false when not using HTTPS
        secure: isLocalEnvironment() ? false : (process.env.COOKIE_SECURE === "true"),
        path: "/",
        // For localhost, domain must be undefined
        domain: isLocalEnvironment() ? undefined : process.env.COOKIE_DOMAIN,
      };

// Validate that maxAge is a positive number
if (typeof cookieConfig.maxAge !== "number" || cookieConfig.maxAge <= 0) {
  console.warn("Invalid cookie maxAge value, defaulting to 7 days");
  cookieConfig.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
}

// Validate cookie configuration settings
console.log("Cookie validation results:", {
  // Basic cookie configuration validation
  cookiePresent: !!cookieConfig,
  cookieType: typeof cookieConfig,
  configKeys: Object.keys(cookieConfig),
  maxAgeValid: typeof cookieConfig.maxAge === "number" && cookieConfig.maxAge > 0,
  secureAppropriate: cookieConfig.secure === true || process.env.NODE_ENV !== "production",
  sameSiteValid: ["strict", "lax", "none"].includes(cookieConfig.sameSite),
  domainValid: !cookieConfig.domain || typeof cookieConfig.domain === "string",
  crossOriginCompatible: process.env.NODE_ENV === "production" ? 
    (cookieConfig.sameSite === "none" && cookieConfig.secure === true) : true,
  subdomainSupport: cookieConfig.domain?.startsWith(".") || false
});

// Log cookie configuration for debugging purposes
console.log("Cookie configuration:", {
  ...cookieConfig,
  domain: cookieConfig.domain,
  environment: process.env.NODE_ENV || "development",
});

// Log cross-origin request handling for development mode
if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode CORS settings:', {
    allowCredentials: true,
    sameSiteMode: cookieConfig.sameSite,
    crossDomainEnabled: cookieConfig.domain !== undefined,
    secureConnection: cookieConfig.secure
  });
}

// Debug cookie domain resolution
console.log("Cookie domain resolution:", {
  configuredDomain: process.env.COOKIE_DOMAIN,
  effectiveDomain: cookieConfig.domain,
  isLocalhost: isLocalEnvironment(),
  isDevelopment: process.env.NODE_ENV !== "production"
});

module.exports = cookieConfig;