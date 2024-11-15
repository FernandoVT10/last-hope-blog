import path from "path";

export const MAX_BLOGPOST_TITLE_LENGTH = 100;
export const MAX_BLOGPOST_CONTENT_LENGTH = 2000;

export const PORT = 3001;

export const SEQUELIZE_LOGGING = true;

export const BLOGPOST_COVERS_DIR = path.resolve(__dirname, "../assets/covers");
export const BLOGPOST_COVER_EXT = "webp";

export const ASSETS_URL = "http://localhost:3000/assets";
