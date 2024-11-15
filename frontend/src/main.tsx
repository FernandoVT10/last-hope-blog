import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Router from "./Router";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router
      routes={[
        { path: "/", Component: Home },
        { path: "*", Component: NotFound },
      ]}
    />
  </StrictMode>,
);
