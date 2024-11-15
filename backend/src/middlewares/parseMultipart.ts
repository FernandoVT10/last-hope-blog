import busboy, { Info } from "busboy";

import { RequestHandler } from "express";

declare global {
  namespace Express {
    export interface Request {
      file?: Buffer;
    }
  }
}

export type FileValidator = (info: Info) => boolean;

export function imageValidator(info: Info) {
  return info.mimeType.startsWith("image/");
}

function parseMultipart(fileName: string, fileValidator?: FileValidator): RequestHandler {
  return (req, _, next) => {
    let fileBuf = Buffer.from([]);

    const bb = busboy({ headers: req.headers });

    bb.on("file", (name, file, info) => {
      if(name !== fileName || (fileValidator && !fileValidator(info)))
        return file.resume();

      file
        .on("data", (chunk) => {
          fileBuf = Buffer.concat([fileBuf, chunk]);
        })
        .on("error", () => {
          next(new Error("Error parsing file"));
        });
    });

    bb.on("field", (name, value) => {
      req.body[name] = value;
    });

    bb.on("error", () => {
      next(new Error("Error parsing data"));
    });

    bb.on("close", () => {
      if(fileBuf.byteLength > 0)
        req.file = fileBuf;

      next();
    });

    req.pipe(bb);
  };
}

export default parseMultipart;
