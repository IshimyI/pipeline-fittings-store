import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwtConfig";
import "dotenv/config";

function generateTokens(payload: string | object | Buffer) {
  return {
    accessToken: jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string,
      jwtConfig.access as jwt.SignOptions
    ),
    refreshToken: jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      jwtConfig.refresh as jwt.SignOptions
    ),
  };
}

export default generateTokens;
