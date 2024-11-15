import { Response, RequestHandler, Request } from "express";

export type Validator = {
  type: "string";
  maxLength?: number;
  required?: boolean;
} | {
  type: "file";
  custom: (req: Request) => Promise<boolean>;
};

export type Validators = Record<string, Validator>;

function badRequest(res: Response, message: string) {
  res.status(400).json({
    error: { message },
  });
}

function validateReq(validators: Validators): RequestHandler {
  return async (req, res, next) => {
    for(const key of Object.keys(validators)) {
      const validator = validators[key];
      const val = req.body[key];

      if(validator.type === "file") {
        try {
          await validator.custom(req);
        } catch(e) {
          if(e instanceof Error)
            return badRequest(res, e.message);

          console.error("This code should be unreachable", e);
          return badRequest(res, "Server Error");
        }
        continue;
      }

      if(validator.required && !val)
        return badRequest(res, `${key} is required`);

      if(typeof(val) !== validator.type)
        return badRequest(res, `${key} must be a ${validator.type}`);

      if(validator.maxLength && val.length > validator.maxLength)
        return badRequest(res, `${key} must contain ${validator.maxLength} or less characters`);
    }

    next();
  };
}

export default validateReq;
