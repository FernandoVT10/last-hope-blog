import { API_URL } from "./constants";
import { BlogPost } from "./types";

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_URL}/blog/posts`);
  const json = await res.json();
  return json.blogPosts;
}

export default {
  getBlogPosts,
};
