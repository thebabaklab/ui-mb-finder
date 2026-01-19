import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "../__root";

export const contactRoute = createRoute({
  path: "/contact",
  getParentRoute: () => rootRoute,
}).lazy(() => import("./contact.lazy").then((d) => d.Route));
