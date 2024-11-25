import fs from "fs";
import sharp from "sharp";
import path from "path";

const WEBP_EXT = "webp";
const MAX_RANDOM_NUM = 10_000;

async function saveBufferWithUniqueName(buffer: Buffer, dirPath: string): Promise<string> {
  const name = `${Math.floor(Math.random() * MAX_RANDOM_NUM)}-${Date.now()}`;
  const fullname = `${name}.${WEBP_EXT}`;

  await fs.promises.mkdir(dirPath, { recursive: true });
  await sharp(buffer).toFile(path.resolve(dirPath, fullname));

  return name;
}

export default {
  saveBufferWithUniqueName,
};
