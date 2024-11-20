import { Router } from "express";
import { PRODUCTION, PASSWORD, JWT_SECRET_KEY } from "../constants";

import jwt from "jsonwebtoken";

const FIFTEEN_DAYS_IN_MILLISECONDS = 15 * 24 * 60 * 60 * 1000;
const EXPIRE_DATE = "15d";

const router = Router();

function getJWT(): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: EXPIRE_DATE,
    };

    jwt.sign({ password: PASSWORD }, JWT_SECRET_KEY, options, (err, token) => {
      if(err) {
        return reject(err);
      }

      if(!token) {
        return reject(new Error("Token is undefined or null"));
      }

      resolve(token);
    });
  });
}

router.post("/login", async (req, res, next) => {
  const password = req.body.password;

  if(password !== PASSWORD) {
    res.status(404).json({
      error: { message: "Password is incorrect" },
    });
    return;
  }

  try {
    const token = await getJWT();
    res.cookie("token", token, {
      maxAge: FIFTEEN_DAYS_IN_MILLISECONDS,
      httpOnly: true,
      sameSite: "strict",
      secure: PRODUCTION,
    });

    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});

export default router;
