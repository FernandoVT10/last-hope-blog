import sharp from "sharp";

import { RequestHandler, Request } from "express";

const DEFAULT_IN_VALUE = "body";

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

type ImageValidator = { type: "image" };

export type Validator = StringValidator | NumberValidator | ImageValidator;

export type Validators = Record<string, Validator>;

function validateString(req: Request, validator: StringValidator, key: string): void {
  const val = req.body[key];

  if(validator.required && !val)
    throw new Error(`${key} is required`);

  if(typeof(val) !== "string")
    throw new Error(`${key} must be a string`);

  if(validator.maxLength && val.length > validator.maxLength)
    throw new Error(`${key} must contain ${validator.maxLength} or less characters`);
}

async function validateNumber(req: Request, validator: NumberValidator, key: string): Promise<void> {
  const val = req[validator.in || DEFAULT_IN_VALUE][key];

  if(validator.required && !val)
    throw new Error(`${key} is required`);

  const num = parseInt(val);
  if(Number.isNaN(num))
    throw new Error(`${key} should be a number`);

  if(validator.min && num < validator.min)
    throw new Error(`${key} should be greater than ${validator.min}`);

  if(validator.custom) {
    try {
      await validator.custom(num);
    } catch(e) {
      if(e instanceof Error)
        throw e;

      console.error("This code should be unreachable", e);
      throw new Error("Server Error");
    }
  }
}

async function validateImage(req: Request, key: string): Promise<void> {
  if(!req.file) throw new Error(`${key} is required`);

  try {
    await sharp(req.file).stats();
  } catch {
    throw new Error(`${key} is not a valid image`);
  }
}

async function validateValidator(req: Request, validator: Validator,  key: string): Promise<void> {
  switch(validator.type) {
    case "string": {
      validateString(req, validator, key);
    } break;
    case "number": {
      await validateNumber(req, validator, key);
    } break;
    case "image": {
      await validateImage(req, key);
    } break;
    default: {
      console.error(new Error("This code should be unreachable"));
      throw new Error("Server Error");
    };
  }
}

function validateReq(validators: Validators): RequestHandler {
  return async (req, res, next) => {
    for(const key of Object.keys(validators)) {
      const validator = validators[key];

      try {
        await validateValidator(req, validator, key);
      } catch(e) {
        if(e instanceof Error) {
          res.status(400).json({
            error: { message: e.message },
          });
          return;
        }

        console.error("All errors should be an instance of Error", e);

        res.status(400).json({
          error: { message: "Server Error" },
        });
        return;
      }
    }

    next();
  };
}

export default validateReq;
