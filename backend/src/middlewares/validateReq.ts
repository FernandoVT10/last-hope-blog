import { Response, RequestHandler, Request } from "express";

type StringValidator = {
  type: "string";
  maxLength?: number;
  required?: boolean;
};

type NumberValidator = {
  type: "number";
  in?: "body" | "params";
  min?: number;
  required?: boolean;
  custom?: (val: number) => Promise<boolean>;
};

type FileValidator = {
  type: "file";
  custom: (req: Request) => Promise<boolean>;
};

export type Validator = StringValidator | FileValidator | NumberValidator;

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

      switch(validator.type) {
        case "file": {
          try {
            await validator.custom(req);
          } catch(e) {
            if(e instanceof Error)
              return badRequest(res, e.message);

            console.error("This code should be unreachable", e);
            return badRequest(res, "Server Error");
          }
        } break;
        case "string": {
          const val = req.body[key];

          if(validator.required && !val)
            return badRequest(res, `${key} is required`);

          if(typeof(val) !== "string")
            return badRequest(res, `${key} must be a string`);

          if(validator.maxLength && val.length > validator.maxLength)
            return badRequest(res, `${key} must contain ${validator.maxLength} or less characters`);
        } break;
        case "number": {
          const val = req[validator.in || "body"][key];

          if(validator.required && !val)
            return badRequest(res, `${key} is required`);

          const num = parseInt(val);
          if(Number.isNaN(num))
            return badRequest(res, `${key} should be a number`);

          if(validator.min && num < validator.min)
            return badRequest(res, `${key} should be greater than ${validator.min}`);

          if(validator.custom) {
            try {
              await validator.custom(num);
            } catch(e) {
              if(e instanceof Error)
                return badRequest(res, e.message);

              console.error("This code should be unreachable", e);
              return badRequest(res, "Server Error");
            }
          }
        } break;
        default: {
          throw new Error("Unreachable");
        };
      }
    }

    next();
  };
}

export default validateReq;
