import { useState, useEffect } from "react";

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

  let Component: React.FC;

  if(!route) {
    const defaultRoute = routes.find(route => {
      return route.path === "*";
    });

    if(!defaultRoute)
      return null;

    Component = defaultRoute.Component;
  } else {
    Component = route.Component;
  }

  return (
    <Component/>
  );
}

export default Router;
