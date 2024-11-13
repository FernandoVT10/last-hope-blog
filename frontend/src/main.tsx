import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/Home";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

import "./index.scss";

type RouterProps = {
  routes: {
    Component: React.FC;
    path: string;
  }[];
};

function Router({ routes }: RouterProps) {
  const [pathname, setPathname] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location]);

  const route = routes.find(route => {
    return route.path === pathname;
  });

  if(!route) {
    const defaultRoute = routes.find(route => {
      return route.path === "*";
    });

    if(defaultRoute)
      return defaultRoute.Component({});

    return null;
  }

  return route.Component({});
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router
      routes={[
        { path: "/", Component: Home },
        { path: "/test", Component: Test },
        { path: "*", Component: NotFound },
      ]}
    />
  </StrictMode>,
);
