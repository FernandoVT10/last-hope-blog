import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalContext } from "./contexts";

import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Page404 from "./pages/Page404";
import CreateBlogPost from "./pages/CreateBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import Login from "./pages/Login";
import BlogHome from "./pages/BlogHome";
import CreateProject from "./pages/CreateProject";

import Router from "./Router";
import Notifications from "./Notifications";

import "./index.scss";

Notifications.init();

const el = document.getElementById("general-data");
const generalData = JSON.parse(el?.textContent || "{}");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalContext.Provider value={generalData}>
      <Router
        routes={[
          { path: "/", Component: Home },
          { path: "/blog/posts/:blogPostId", Component: BlogPost },
          { path: "/blog/create-post", Component: CreateBlogPost },
          { path: "/blog/posts/:blogPostId/edit", Component: EditBlogPost },
          { path: "/login", Component: Login },
          { path: "/blog", Component: BlogHome },
          { path: "/projects/create", Component: CreateProject },
          { path: "*", Component: Page404 },
        ]}
      />
    </GlobalContext.Provider>
  </StrictMode>,
);
