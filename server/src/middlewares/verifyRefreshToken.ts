import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import cookieConfig from "../configs/cookieConfig";
import "dotenv/config";

function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { user: Record<string, unknown> };
    res.locals.user = user;
    next();
  } catch (error) {
    console.log("invalid refresh token");
    res.clearCookie("refreshToken", cookieConfig).sendStatus(401);
  }
}

export default verifyRefreshToken;
