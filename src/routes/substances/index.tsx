import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const substancesRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/substances",
  validateSearch: z.object({
    page: z.number().optional(),
    title: z.string().optional(),
    ceillineName: z.string().optional(),
  }),
}).lazy(() => import("./substances.lazy").then((d) => d.Route));
