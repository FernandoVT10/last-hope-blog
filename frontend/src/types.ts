export type BlogPost = {
  id: number;
  cover: string;
  title: string;
  content: string;
  createdAt: string;
};

export type Project = {
  id: number;
  cover: string;
  name: string;
  description: string;
  link: string;
};

declare global {
  interface Window {
    Prism: any;
  }
}
