import { useState, useEffect } from "react";

type Route = {
  Component: React.FC<any>;
  path: string;
};

function testPaths(routePath: string, path: string): boolean {
  if(routePath === path)
    return true;

  const splittedRoute = routePath.split("/")
  const splittedPath = path.split("/");

  if(splittedRoute.length !== splittedPath.length)
    return false;

  // skip the first one because it's always empty
  for(let i = 1; i < splittedRoute.length; i++) {
    const routePart = splittedRoute[i];
    const pathPart = splittedPath[i];

    // skip variable part
    if(routePart.startsWith(":")) {
      continue;
    }

    if(routePart !== pathPart)
      return false;
  }

  return true;
}

function getParams(routePath: string, path: string): Record<string, string> {
  const splittedRoute = routePath.split("/")
  const splittedPath = path.split("/");

  const params: Record<string, string> = {};

  // skip the first one because it's always empty
  for(let i = 1; i < splittedRoute.length; i++) {
    const routePart = splittedRoute[i];
    const pathPart = splittedPath[i];

    if(routePart.startsWith(":")) {
      const varName = routePart.slice(1);
      params[varName] = pathPart;
    }
  }

  return params;
}

function getComponent(routes: Route[], path?: string): React.JSX.Element | null {
  if(!path)
    return null;

  let defaultRoute: Route | undefined;

  for(const route of routes) {
    if(route.path === "*") {
      defaultRoute = route;
      continue;
    }

    if(testPaths(route.path, path)) {
      const params = getParams(route.path, path);
      return <route.Component {...params}/>;
    }
  }

  return defaultRoute ? <defaultRoute.Component/> : null;
}

type RouterProps = {
  routes: Route[];
};

function Router({ routes }: RouterProps) {
  const [pathname, setPathname] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location]);

  return getComponent(routes, pathname);
}

export default Router;
