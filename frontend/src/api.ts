import { API_URL } from "./constants";
import { BlogPost } from "./types";

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_URL}/blog/posts`);
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

export default {
  getBlogPosts,
  getBlogPost,
};
