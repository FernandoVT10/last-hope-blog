import { Response, RequestHandler } from "express";

export type Validator = {
  type: "string";
  length?: { min: number, max: number };
  required?: boolean;
};

export type Validators = Record<string, Validator>;

function badRequest(res: Response, message: string) {
  res.status(400).json({
    error: { message },
  });
}

function validateReq(validators: Validators): RequestHandler {
  return (req, res, next) => {
    for(const key of Object.keys(validators)) {
      const validator = validators[key];
      const val = req.body[key];

      if(validator.required && !val)
        return badRequest(res, `${key} is required`);

      if(typeof(val) !== validator.type)
        return badRequest(res, `${key} must be a ${validator.type}`);

      if(validator.length) {
        const { min, max } = validator.length;
        const len = val.length;

        if(len < min)
          return badRequest(res, `${key} must contain at least ${min} characters`);

        if(len > max)
          return badRequest(res, `${key} must contain ${max} or less characters`);
      }
    }

    next();
  };
}

export default validateReq;
