import fs from "fs";
import sharp from "sharp";
import path from "path";

import { ASSETS_DIR, ASSETS_URL } from "../constants";

const WEBP_EXT = "webp";
const MAX_RANDOM_NUM = 10_000;

async function saveBufferWithUniqueName(buffer: Buffer, dirPath: string): Promise<string> {
  const name = `${Math.floor(Math.random() * MAX_RANDOM_NUM)}-${Date.now()}`;
  const fullname = `${name}.${WEBP_EXT}`;

  await fs.promises.mkdir(dirPath, { recursive: true });
  await sharp(buffer).toFile(path.resolve(dirPath, fullname));

  return name;
}

function getURLFromName(name: string, storedPath: string): string {
  const fullname = `${name}.${WEBP_EXT}`;
  const imagePath = path.resolve(storedPath, fullname);

  const localPath = imagePath.replace(ASSETS_DIR, "");
  return ASSETS_URL + localPath;
}

export default {
  saveBufferWithUniqueName,
  getURLFromName,
};
