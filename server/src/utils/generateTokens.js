const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwtConfig");
require("dotenv").config();

function generateTokens(payload) {
  try {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload: Payload must be an object');
    }
    if (!payload.user) {
      throw new Error('Invalid payload: user is required');
    }
    const accessToken = jwt.sign(
      {
        ...payload,
        tokenType: 'access',
        iat: Math.floor(Date.now() / 1000),
        deviceId: payload.deviceId || 'unknown'
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: jwtConfig.access.expiresIn
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: jwtConfig.refresh.expiresIn
      }
    );

    // Verify tokens before returning
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    console.log(`Tokens generated successfully for user ${payload.user}`);
    console.log(`Access token expires in: ${jwtConfig.access.expiresIn}`);
    console.log(`Refresh token expires in: ${jwtConfig.refresh.expiresIn}`);

    return { accessToken, refreshToken };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new Error(`Token signing failed: ${error.message}`);
    } else if (error.name === 'TokenExpiredError') {
      throw new Error('Token expired during generation');
    } else if (error.message.includes('Invalid payload')) {
      throw new Error(error.message);
    } else {
      throw new Error(`Token generation failed: ${error.message}`);
    }
  }
}

  module.exports = generateTokens;
