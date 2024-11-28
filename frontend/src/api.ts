import { BlogPost } from "./types";

type CreateBlogPostData = {
  cover: File;
  title: string;
  content: string;
};

const API_URL = "/api";

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
    throw new Error(`The server responded with status: ${res.status}`);

  const json = await res.json();
  return json.blogPost;
}

async function deleteBlogPost(blogPostId: number): Promise<void> {
  const res = await fetch(`${API_URL}/blog/posts/${blogPostId}`, {
    method: "DELETE",
  });

  if(res.status === 200)
    return;

  throw new Error(`The server responded with status: ${res.status}`);
}

export type UpdateBlogPostData = {
  title?: string;
  content?: string;
  cover?: File;
};

async function updateBlogPost(blogPostId: number, data: UpdateBlogPostData): Promise<void> {
  const formData = new FormData();

  if(data.title)
    formData.append("title", data.title);
  if(data.content)
    formData.append("content", data.content);
  if(data.cover)
    formData.append("cover", data.cover);

  const res = await fetch(`${API_URL}/blog/posts/${blogPostId}`, {
    method: "PUT",
    body: formData,
  });

  if(res.status !== 200)
    throw new Error(`The server responded with status: ${res.status}`);
}

async function login(password: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ password }),
  });

  return res.status === 200;
}

type CreateProjectData = {
  name: string;
  description: string;
  link: string;
  cover: File;
};

async function createProject(data: CreateProjectData): Promise<void> {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("link", data.link);
  formData.append("cover", data.cover);

  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    body: formData,
  });

  if(res.status !== 200)
    throw new Error(`The server responded with status: ${res.status}`);
}

async function deleteProject(projectId: number): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "DELETE",
  });

  if(res.status === 200)
    return;

  throw new Error(`The server responded with status: ${res.status}`);
}

export type UpdateProjectData = {
  name?: string;
  description?: string;
  link?: string;
  cover?: File;
};

async function updateProject(projectId: number, data: UpdateProjectData): Promise<void> {
  const formData = new FormData();

  if(data.name)
    formData.append("name", data.name);
  if(data.description)
    formData.append("description", data.description);
  if(data.link)
    formData.append("link", data.link);
  if(data.cover)
    formData.append("cover", data.cover);

  const res = await fetch(`${API_URL}/projects/${projectId}`, {
    method: "PUT",
    body: formData,
  });

  if(res.status !== 200)
    throw new Error(`The server responded with status: ${res.status}`);
}

export default {
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  login,
  createProject,
  deleteProject,
  updateProject,
};
