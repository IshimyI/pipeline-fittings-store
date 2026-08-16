import express, { type Request, type Response } from "express";
import verifyRefreshToken from "../middlewares/verifyRefreshToken";
import generateTokens from "../utils/generateTokens";
import cookieConfig from "../configs/cookieConfig";

const tokensRouter = express.Router();

tokensRouter.get("/refresh", verifyRefreshToken, async (_req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = generateTokens({
      user: res.locals.user,
    });

    res
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    res.clearCookie("refreshToken", cookieConfig).sendStatus(401);
  }
});

export default tokensRouter;
