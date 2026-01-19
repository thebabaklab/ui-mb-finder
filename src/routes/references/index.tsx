import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const referencesRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/references",
  validateSearch: z.object({
    page: z.number().optional(),
    imgId: z.string().optional(),
    ceillineName: z.string().optional(),
  }),
}).lazy(() => import("./references.lazy").then((d) => d.Route));
