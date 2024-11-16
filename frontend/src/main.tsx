import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import CreateBlogPost from "./pages/CreateBlogPost";
import Router from "./Router";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router
      routes={[
        { path: "/", Component: Home },
        { path: "/blog/posts/:blogPostId", Component: BlogPost },
        { path: "/blog/create-post", Component: CreateBlogPost },
        { path: "*", Component: NotFound },
      ]}
    />
  </StrictMode>,
);
