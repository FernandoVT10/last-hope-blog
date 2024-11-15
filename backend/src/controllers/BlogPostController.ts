import fs from "fs";
import sharp from "sharp";
import path from "path";

import { BlogPost } from "../models";
import { BLOGPOST_COVERS_DIR } from "../constants";

const MAX_RANDOM_NUM = 10000;

type CreateOneData = {
  title: string;
  content: string;
};

async function saveCover(cover: Buffer): Promise<string> {
  const coverName = `${Math.floor(Math.random() * MAX_RANDOM_NUM)}-${Date.now()}`;
  const coverWithExt = `${coverName}.webp`;

  await fs.promises.mkdir(BLOGPOST_COVERS_DIR, { recursive: true });
  await sharp(cover).toFile(path.resolve(BLOGPOST_COVERS_DIR, coverWithExt));

  return coverName;
}

async function createOne(cover: Buffer, data: CreateOneData): Promise<void> {
  const coverName = await saveCover(cover);

  await BlogPost.create({
    ...data,
    cover: coverName,
  });
}

async function getAll(): Promise<BlogPost[]> {
  return await BlogPost.findAll();
}

export default {
  createOne,
  getAll,
};
