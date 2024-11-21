import path from "path";
import { config } from "dotenv";

const ENV_FILE_PATH = path.resolve(__dirname, "../../.env");

config({
  path: ENV_FILE_PATH,
});

export const MAX_BLOGPOST_TITLE_LENGTH = 100;
export const MAX_BLOGPOST_CONTENT_LENGTH = 2000;
export const BLOGPOST_COVERS_DIR = path.resolve(__dirname, "../assets/covers");
export const BLOGPOST_COVER_EXT = "webp";

export const PORT = 3000;

export const SEQUELIZE_LOGGING = true;

export const ASSETS_URL = "http://localhost:3000/assets";

export const HTML_PATH = path.resolve(__dirname, "../../build/index.html");
export const DATA_SYMBOL = "<!--data-->";

export const PRODUCTION = process.env.NODE_ENV === "production";

export const TOKEN_COOKIE_NAME = "token";

export const PASSWORD = process.env.PASSWORD as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// TODO: add a warning if .env file doesn't exist
