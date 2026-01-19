import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "../__root";

export const aboutRoute = createRoute({
  path: "/about",
  getParentRoute: () => rootRoute,
}).lazy(() => import("./about.lazy").then((d) => d.Route));
