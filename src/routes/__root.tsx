import { createRootRoute, ErrorComponent, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  errorComponent: (() => ErrorComponent)(),
  notFoundComponent: () => <div>not found</div>,
});
