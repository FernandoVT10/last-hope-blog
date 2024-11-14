import { BlogPost } from "../models";

type CreateOneData = {
  title: string;
  content: string;
};

async function createOne(data: CreateOneData): Promise<void> {
  await BlogPost.create({
    ...data,
    cover: "test.webp",
  });
}

async function getAll(): Promise<BlogPost[]> {
  return await BlogPost.findAll();
}

export default {
  createOne,
  getAll,
};
