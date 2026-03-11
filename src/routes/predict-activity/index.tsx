import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "../__root";

export const predictRoute = createRoute({
  path: "/predict-activity",
  getParentRoute: () => rootRoute,
}).lazy(() => import("./predict-activity.lazy").then((d) => d.Route));
