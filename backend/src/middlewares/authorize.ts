import jwt from "jsonwebtoken";

import { RequestHandler } from "express";
import { JWT_SECRET_KEY, PASSWORD, TOKEN_COOKIE_NAME } from "../constants";

type DecodedData = {
  password: string;
};

function decodeToken(jwtToken: string): Promise<DecodedData> {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, JWT_SECRET_KEY, (err, decodedData) => {
      if(err)
        return reject(err);

      if(!decodedData)
        return reject(new Error("Decoded data is undefined"));

      resolve(decodedData as DecodedData);
    });
  });
}

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const data = await decodeToken(token);
    return data.password === PASSWORD;
  } catch {
    return false;
  }
}

export function authorizePage(): RequestHandler {
  return async (req, res, next) => {
    const token = req.cookies[TOKEN_COOKIE_NAME];
    if(!token || !(await isTokenValid(token))) {
      res.redirect("/");
      return;
    }

    next();
  };
}

export function authorizeApi(): RequestHandler {
  return async (req, res, next) => {
    const token = req.cookies[TOKEN_COOKIE_NAME];

    if(!token || !(await isTokenValid(token))) {
      res.status(401).json({
        error: { message: "You need to be logged in" },
      });
      return;
    }

    next();
  };
}
