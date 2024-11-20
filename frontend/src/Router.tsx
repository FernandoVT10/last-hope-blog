import { useState, useEffect } from "react";

type Route = {
  Component: React.FC<any>;
  path: string;
};

type RouterProps = {
  routes: Route[];
};

enum TokenType {
  URL,
  Var,
}

type Token = {
  type: TokenType;
  val: string;
};

function tokenizeRoutePath(path: string): Token[] {
  const tokens: Token[] = [{
    type: TokenType.URL,
    val: "",
  }];

  let collectingVar = false;

  for(const c of path) {
    if(collectingVar) {
      if(c !== "/") {
        tokens[tokens.length - 1].val += c;
        continue;
      }

      collectingVar = false;
      tokens.push({
        type: TokenType.URL,
        val: "",
      });
    }

    if(c === ":") {
      collectingVar = true;
      tokens.push({
        type: TokenType.Var,
        val: "",
      });
      continue;
    }

    tokens[tokens.length - 1].val += c;
  }

  return tokens;
}

function comparePaths(routePath: string, path: string): boolean {
  if(routePath === path)
    return true;

  // the routePath doesn't contain a variable, and they are not the same
  // so they cannot match
  if(routePath.indexOf(":") === -1)
    return false;

  const maxLen = Math.max(routePath.length, path.length);

  let varName = "", varVal = "";
  let collectingVar = false;

  for(let i = 0; i < maxLen; i++) {
    const routeChar = routePath[i];
    const pChar = path[i];


    if(routeChar === ":") {
      collectingVar = true;
    }

    if(routeChar[i] !== pChar[i])
      return false;
  }

  return true;
}

function getComponent(routes: Route[], path?: string): React.JSX.Element | null {
  if(!path)
    return null;

  for(const route of routes) {
    // if(pathContainsVar(route.path)) {
    //   const [actualPath, varName] = route.path.split(":");
    //
    //   if(path.startsWith(actualPath)) {
    //     const varVal = path.replace(actualPath, "");
    //
    //     const props = {
    //       [varName]: varVal,
    //     };
    //
    //     return <route.Component {...props}/>;
    //   }
    // } else {
    //   if(route.path === path) {
    //     return <route.Component/>;
    //   }
    // }
    if(route.path === "*")
      continue;

    if(comparePaths(route.path, path)) {
      return <route.Component/>;
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
