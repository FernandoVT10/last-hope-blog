import { API_URL } from "./constants";
import { BlogPost } from "./types";

async function getBlogPosts(limit: number): Promise<BlogPost[]> {
  const res = await fetch(`${API_URL}/blog/posts?limit=${limit}`);
  const json = await res.json();
  return json.blogPosts;
}

async function getBlogPost(blogPostId: number): Promise<BlogPost | null> {
  const res = await fetch(`${API_URL}/blog/posts/${blogPostId}`);

  if(res.status !== 200)
    return null;

  const json = await res.json();
  return json.blogPost;
}

type CreateBlogPostData = {
  cover: File;
  title: string;
  content: string;
};

async function createBlogPost(data: CreateBlogPostData): Promise<BlogPost> {
  const formData = new FormData();

  formData.append("cover", data.cover);
  formData.append("title", data.title);
  formData.append("content", data.content);

  const res = await fetch(`${API_URL}/blog/posts`, {
    method: "POST",
    body: formData,
  });

  if(res.status !== 200)
    throw new Error(`The server responded with status ${res.status}`);

  const json = await res.json();
  return json.blogPost;
}

export default {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
};
