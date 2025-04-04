// JWT configuration for access and refresh tokens
// Access tokens are short-lived for security
// Refresh tokens have longer expiry for persistent sessions

const jwtConfig = {
  access: {
    expiresIn: '15m',
    secret: process.env.JWT_ACCESS_SECRET || 'your-access-secret-key'
  },
  refresh: {
    expiresIn: '7d',
    secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
  },
  cookieOptions: {
    secure: true, // Always true for cross-domain cookies
    sameSite: 'none', // Required for cross-domain cookies
    httpOnly: true,
    path: '/'
  }
};

module.exports = jwtConfig;