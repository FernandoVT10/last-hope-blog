import { useState, useEffect } from "react";

type Route = {
  Component: React.FC<any>;
  path: string;
};

type RouterProps = {
  routes: Route[];
};

function pathContainsVar(path: string): boolean {
  return path.indexOf(":") !== -1;
}

function getComponent(routes: Route[], path?: string): React.JSX.Element | null {
  if(!path)
    return null;

  for(const route of routes) {
    if(pathContainsVar(route.path)) {
      const [actualPath, varName] = route.path.split(":");

      if(path.startsWith(actualPath)) {
        const varVal = path.replace(actualPath, "");

        const props = {
          [varName]: varVal,
        };

        return <route.Component {...props}/>;
      }
    } else {
      if(route.path === path) {
        return <route.Component/>;
      }
    }
  }

  const defaultRoute = routes.find(route => {
    return route.path === "*";
  });

  return defaultRoute ? <defaultRoute.Component/> : null;
}

function Router({ routes }: RouterProps) {
  const [pathname, setPathname] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location]);

  return getComponent(routes, pathname);
}

export default Router;
