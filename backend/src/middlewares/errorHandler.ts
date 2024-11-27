import { Request, Response, NextFunction } from "express";

const DEFAULT_MESSAGE = "There was an internal server error, try it again later";

const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  if(err instanceof Error) {
    console.error(err);
  } else {
    // now the err variable can have something unexpected so when want to get as
    // much information as possible using the String constuctor and then passing it
    // to the logger
    console.error(String(err));
  }

  // differentiate between api and page route
  if(req.path.startsWith("/api")) {
    res.status(500).json({
      errors: [{ message: DEFAULT_MESSAGE }]
    });
    return;
  }

  res.status(500).send(DEFAULT_MESSAGE);
};

export default errorHandler;
