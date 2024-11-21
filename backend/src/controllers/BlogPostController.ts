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

async function deleteCover(coverName: string): Promise<void> {
  const coverWithExt = `${coverName}.${BLOGPOST_COVER_EXT}`;
  const fullPath = path.resolve(BLOGPOST_COVERS_DIR, coverWithExt);
  await fs.promises.rm(fullPath);
}

async function replaceCover(newCover: Buffer, prevCoverName: string): Promise<void> {
  const coverWithExt = `${prevCoverName}.${BLOGPOST_COVER_EXT}`;
  await fs.promises.mkdir(BLOGPOST_COVERS_DIR, { recursive: true });
  await sharp(newCover).toFile(path.resolve(BLOGPOST_COVERS_DIR, coverWithExt));
}

function getCoverURL(coverName: string): string {
  return `${ASSETS_URL}/covers/${coverName}.${BLOGPOST_COVER_EXT}`;
}

async function createOne(cover: Buffer, data: CreateOneData): Promise<BlogPost> {
  const coverName = await saveCover(cover);

  return await BlogPost.create({
    ...data,
    cover: coverName,
  });
}

async function getAllWithURLCover(limit: number): Promise<BlogPost[]> {
  const posts = await BlogPost.findAll({
    limit,
    order: [["createdAt", "DESC"]],
  });
  return posts.map(post => {
    post.cover = getCoverURL(post.cover);

    return post;
  });
}

async function getByIdWithURLCover(id: number): Promise<BlogPost | null> {
  const blogPost = await BlogPost.findByPk(id);

  if(!blogPost)
    return null;

  blogPost.cover = getCoverURL(blogPost.cover);
  return blogPost;
}

async function existsById(id: number): Promise<boolean> {
  const count = await BlogPost.count({
    where: { id },
  });

  return count > 0;
}

async function deleteById(id: number): Promise<void> {
  const blogPost = await BlogPost.findByPk(id);

  if(!blogPost)
    throw new Error("Blog Post is null");

  await deleteCover(blogPost.cover);

  await blogPost.destroy();
}

type UpdateByIdData = {
  title?: string;
  content?: string;
  cover?: Buffer;
};

async function updateById(id: number, data: UpdateByIdData): Promise<void> {
  const blogPost = await BlogPost.findByPk(id);

  if(!blogPost)
    throw new Error("Blog Post is null");

  if(data.cover) {
    await replaceCover(data.cover, blogPost.cover);
  }

  await blogPost.update({
    title: data.title,
    content: data.content,
  });
}

export default {
  createOne,
  getAllWithURLCover,
  getByIdWithURLCover,
  existsById,
  deleteById,
  updateById,
};
