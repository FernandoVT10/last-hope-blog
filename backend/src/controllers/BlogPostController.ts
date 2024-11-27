import ImageController from "./ImageController";

import { BlogPost } from "../models";
import { BLOGPOST_COVERS_DIR } from "../constants";

type CreateOneData = {
  title: string;
  content: string;
};

async function createOne(cover: Buffer, data: CreateOneData): Promise<BlogPost> {
  const coverName = await ImageController.saveBufferWithUniqueName(cover, BLOGPOST_COVERS_DIR);

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
    post.cover = ImageController.getURLFromName(post.cover, BLOGPOST_COVERS_DIR);

    return post;
  });
}

async function getByIdWithURLCover(id: number): Promise<BlogPost | null> {
  const blogPost = await BlogPost.findByPk(id);

  if(!blogPost)
    return null;

  blogPost.cover = ImageController.getURLFromName(blogPost.cover, BLOGPOST_COVERS_DIR);
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

  await ImageController.deleteByUniqueName(blogPost.cover, BLOGPOST_COVERS_DIR);

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
    await ImageController.replaceWithBuffer(data.cover, blogPost.cover, BLOGPOST_COVERS_DIR);
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
