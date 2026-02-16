import { createRootRoute, ErrorComponent, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { trackPage } from "../analytics/analytics";

const RootLayout = () => {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  useEffect(() => {
    // console.log("Route:", pathname);
    trackPage(pathname);
  }, [pathname]);

  return <Outlet />;
}

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  // component: RootLayout,
  errorComponent: (() => ErrorComponent)(),
  notFoundComponent: () => <div>not found</div>,
});
