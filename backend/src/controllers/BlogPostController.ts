import fs from "fs";
import sharp from "sharp";
import path from "path";

import { BlogPost } from "../models";
import { BLOGPOST_COVERS_DIR, BLOGPOST_COVER_EXT, ASSETS_URL } from "../constants";

const MAX_RANDOM_NUM = 10000;

type CreateOneData = {
  title: string;
  content: string;
};

async function saveCover(cover: Buffer): Promise<string> {
  const coverName = `${Math.floor(Math.random() * MAX_RANDOM_NUM)}-${Date.now()}`;
  const coverWithExt = `${coverName}.${BLOGPOST_COVER_EXT}`;

  await fs.promises.mkdir(BLOGPOST_COVERS_DIR, { recursive: true });
  await sharp(cover).toFile(path.resolve(BLOGPOST_COVERS_DIR, coverWithExt));

  return coverName;
}

function getCoverURL(coverName: string): string {
  return `${ASSETS_URL}/covers/${coverName}.${BLOGPOST_COVER_EXT}`;
}

async function createOne(cover: Buffer, data: CreateOneData): Promise<void> {
  const coverName = await saveCover(cover);

  await BlogPost.create({
    ...data,
    cover: coverName,
  });
}

async function getAllWithURLCover(): Promise<BlogPost[]> {
  const posts = await BlogPost.findAll();
  return posts.map(post => {
    post.cover = getCoverURL(post.cover);

    return post;
  });
}

async function getByIdWithURLCover(id: number): Promise<BlogPost> {
  const blogPost = await BlogPost.findByPk(id);

  if(!blogPost)
    throw new Error("Blog post is null");

  blogPost.cover = getCoverURL(blogPost.cover);
  return blogPost;
}

async function existsById(id: number): Promise<boolean> {
  const count = await BlogPost.count({
    where: { id },
  });

  return count > 0;
}

export default {
  createOne,
  getAllWithURLCover,
  getByIdWithURLCover,
  existsById,
};
