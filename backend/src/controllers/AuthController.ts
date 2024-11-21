import jwt from "jsonwebtoken";
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

async function isAuthenticated(cookies: Record<string, string>): Promise<boolean> {
  const token = cookies[TOKEN_COOKIE_NAME];

  if(!token)
    return false;

  try {
    const data = await decodeToken(token);
    return data.password === PASSWORD;
  } catch {
    return false;
  }
}

export default {
  isAuthenticated,
};
