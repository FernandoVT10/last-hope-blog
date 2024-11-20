import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import CreateBlogPost from "./pages/CreateBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import Login from "./pages/Login";

import Router from "./Router";
import Notifications from "./Notifications";

import "./index.scss";

Notifications.init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router
      routes={[
        { path: "/", Component: Home },
        { path: "/blog/posts/:blogPostId", Component: BlogPost },
        { path: "/blog/create-post", Component: CreateBlogPost },
        { path: "/blog/posts/:blogPostId/edit", Component: EditBlogPost },
        { path: "/login", Component: Login },
        { path: "*", Component: NotFound },
      ]}
    />
  </StrictMode>,
);
