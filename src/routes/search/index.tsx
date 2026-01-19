import { RootLayout } from "@layouts";
import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "../../routes/__root";

export const searchRoute = createRoute({
  id: "search",
  component: RootLayout,
  getParentRoute: () => rootRoute,
});
