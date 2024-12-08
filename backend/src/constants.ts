import path from "path";
import fs from "fs";
import { config } from "dotenv";

const ENV_FILE_PATH = path.resolve(__dirname, "../../.env");

if(!fs.existsSync(ENV_FILE_PATH)) {
  console.error(`[SERVER] Error: .env file not found in ${ENV_FILE_PATH}, did you create it?`);
  process.exit(1);
}

config({
  path: ENV_FILE_PATH,
});

export const ASSETS_DIR = path.resolve(__dirname, "../assets");
export const RESOURCES_DIR = path.resolve(__dirname, "../../frontend/build/resources");
export const BLOGPOST_COVERS_DIR = path.resolve(ASSETS_DIR, "covers/blog");
export const PROJECT_COVERS_DIR = path.resolve(ASSETS_DIR, "covers/projects");
export const BLOG_UPLOADS_DIR = path.resolve(ASSETS_DIR, "uploads/blog");

export const MAX_BLOGPOST_TITLE_LENGTH = 100;
export const MAX_BLOGPOST_CONTENT_LENGTH = 5000;

export const MAX_PROJECT_NAME_LENGTH = 100;
export const MAX_PROJECT_DESCRIPTION_LENGTH = 500;
export const MAX_PROJECT_LINK_LENGTH = 200;

export const PORT = 3000;

export const SEQUELIZE_LOGGING = true;

export const HTML_PATH = path.resolve(__dirname, "../../frontend/build/index.html");

export const PRODUCTION = process.env.NODE_ENV === "production";

export const TOKEN_COOKIE_NAME = "token";

export const ASSETS_URL = process.env.ASSETS_URL as string;
export const PASSWORD = process.env.PASSWORD as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
