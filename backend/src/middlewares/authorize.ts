import { RequestHandler } from "express";
import AuthController from "../controllers/AuthController";

export function authorizePage(): RequestHandler {
  return async (req, res, next) => {
    if(await AuthController.isAuthenticated(req.cookies)) {
      return next();
    }

    res.redirect("/");
  };
}

export function authorizeApi(): RequestHandler {
  return async (req, res, next) => {
    if(await AuthController.isAuthenticated(req.cookies)) {
      return next();
    }

    res.status(401).json({
      error: { message: "You need to be logged in" },
    });
  };
}
