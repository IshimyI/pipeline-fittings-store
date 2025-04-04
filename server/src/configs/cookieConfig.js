const jwtConfig = require("./jwtConfig");

const cookiePrefix = '__Secure-';


// Helper function to convert JWT time string to milliseconds
const convertJwtTimeToMs = (timeString) => {
  const units = {
    s: 1000, // seconds to ms
    m: 60 * 1000, // minutes to ms
    h: 60 * 60 * 1000, // hours to ms
    d: 24 * 60 * 60 * 1000, // days to ms
  };

  const match = timeString.match(/^(\\d+)([smhd])$/);
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

// Helper function to validate domain
const validateDomain = (domain) => {
  if (!domain) return undefined;
  
  // Remove protocol if present
  let cleanDomain = domain.replace(/^https?:\/\//, '');
  
  // Remove path and query params if present
  cleanDomain = cleanDomain.split('/')[0];
  
  // Remove leading dot if present
  cleanDomain = cleanDomain.replace(/^\./, '');
  
  // Handle Vercel preview domains
  if (cleanDomain.endsWith('.vercel.app')) {
    return cleanDomain;
  }
  
  // Handle Render domains
  if (cleanDomain.endsWith('.onrender.com')) {
    return cleanDomain;
  }
  
  // Enhanced domain validation with wildcard support
  const domainRegex = /^(\*\.)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
  if (!domainRegex.test(cleanDomain)) {
    console.warn(`Invalid domain format: ${cleanDomain}, using undefined`);
    console.warn('Domain validation failed:', {
      originalDomain: domain,
      cleanDomain,
      reason: 'Does not match domain pattern',
      allowedPattern: domainRegex.toString()
    });
    return undefined;
  }
  
  return cleanDomain;
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

// Helper function to determine if running on Render
const isRenderEnvironment = () => {
  return Boolean(
    process.env.RENDER ||
    process.env.RENDER_EXTERNAL_URL ||
    process.env.RENDER_SERVICE_ID ||
    process.env.IS_RENDER ||
    process.env.RENDER_INTERNAL_HOSTNAME ||
    process.env.RENDER_GIT_BRANCH ||
    process.env.RENDER_GIT_COMMIT ||
    process.env.RENDER_INSTANCE_ID
  );
};

// Configure cookies based on environment
let cookieConfig;

// Default cookie configuration for cross-domain support
const defaultCookieConfig = {
  httpOnly: true,
  maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
  sameSite: "none", // Required for cross-domain support
  secure: true,     // Required for cross-domain and when sameSite is 'none'
  path: "/",
  domain: process.env.COOKIE_DOMAIN || undefined,
  _crossDomainEnabled: true, // Flag indicating cross-domain support is enabled,
  prefix: cookiePrefix // Cookie name prefix for security
};

// Get the frontend domain from environment variables or use a default
const frontendDomain = validateDomain(
  process.env.FRONTEND_DOMAIN || 
  process.env.COOKIE_DOMAIN || 
  "pipeline-fittings-store-client.vercel.app"
);

if (!frontendDomain) {
  console.warn('Failed to validate frontend domain. This may cause cookie issues.');
  console.warn('Attempted domains:', {
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || 'not set',
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || 'not set',
    default: 'pipeline-fittings-store-client.vercel.app'
  });
}

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

  console.log(`Development environment detected for session cookie, using ${cookieConfig.domain || 'undefined'} domain`);
  console.log(`Session cookie domain: ${cookieConfig.domain || 'undefined'}`);
} else if (isVercelEnvironment()) {
  // Verify VERCEL_URL is available
  if (!process.env.VERCEL_URL) {
    console.warn("VERCEL_URL environment variable is missing, using default domain");
  }

  // Vercel-specific configuration
  cookieConfig = {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: "none", // Required for cross-domain cookies
    secure: true, // Required when sameSite is 'none'
    path: "/",
    domain: validateDomain(process.env.COOKIE_DOMAIN || frontendDomain),
  };

  console.log(`Vercel environment detected, using domain: ${cookieConfig.domain || 'undefined'}`);
} else if (isRenderEnvironment()) {
  // Render-specific configuration
  cookieConfig = {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: "none", // Required for cross-domain cookies
    secure: true, // Required when sameSite is 'none'
    path: "/",
    domain: validateDomain(process.env.COOKIE_DOMAIN || frontendDomain),
  };

  console.log(`Render environment detected, using domain: ${cookieConfig.domain || 'undefined'}`);
  console.log(`Cross-domain cookie configuration: sameSite=${cookieConfig.sameSite}, secure=${cookieConfig.secure}`);
} else if (process.env.NODE_ENV === "production") {
  // Non-Vercel production configuration
  cookieConfig = {
    httpOnly: true,
    maxAge: convertJwtTimeToMs(jwtConfig.refresh.expiresIn),
    sameSite: "none", // For cross-domain cookies
    secure: true, // Required when sameSite is 'none'
    path: "/",
    domain: validateDomain(process.env.COOKIE_DOMAIN || frontendDomain),
  };

  console.log(`Production environment detected, using domain: ${cookieConfig.domain || 'undefined'}`);
} else {
  // Default configuration when NODE_ENV is not set or doesn't match expected values
  console.warn("NODE_ENV not set or unrecognized, using default cookie configuration");
  cookieConfig = { ...defaultCookieConfig };
}

// Validate cookie configuration
const validateCookieConfig = (config) => {
  if (config.sameSite === 'none' && !config.secure) {
    console.error('Invalid cookie configuration: secure must be true when sameSite is "none"');
    config.secure = true;
  }
  return config;
};

// Ensure cookieConfig is defined
if (!cookieConfig) {
  console.warn("cookieConfig was not properly set, using default configuration");
  cookieConfig = { ...defaultCookieConfig };
}

// Validate cookie configuration
cookieConfig = validateCookieConfig(cookieConfig);

// Validate that maxAge is a positive number
if (!cookieConfig || typeof cookieConfig.maxAge !== "number" || cookieConfig.maxAge <= 0) {
  console.warn("Invalid cookie maxAge value, defaulting to 7 days");
  cookieConfig.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
}

// Debug mode configuration
const DEBUG_MODE = process.env.DEBUG_COOKIE_CONFIG === 'true';

// Log cookie configuration for debugging purposes
// Log if we're using default configuration
if (cookieConfig === defaultCookieConfig) {
  console.warn("Using default cookie configuration as fallback");
}

if (DEBUG_MODE) {
  console.log("Cookie configuration:", {
    ...cookieConfig,
    domain: cookieConfig.domain || "undefined",
    environment: process.env.NODE_ENV || "development",
    isVercel: isVercelEnvironment() ? "yes" : "no",
    isRender: isRenderEnvironment() ? "yes" : "no",
    frontendDomain,
    cookieDomain: process.env.COOKIE_DOMAIN,
    vercelUrl: process.env.VERCEL_URL,
    renderUrl: process.env.RENDER_EXTERNAL_URL
  });
}

module.exports = cookieConfig || defaultCookieConfig;