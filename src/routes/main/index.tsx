import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "../__root";

export const mainRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
}).lazy(() => import("./main.lazy").then((d) => d.Route));
