import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const substanceBioDataRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/substances/bio-data/$imgId",
  validateSearch: z.object({
    page: z.number().optional(),
    queryStr: z.string().optional(),
    filters: z.string().optional(),
  }),
}).lazy(() => import("./substance-bio-data.lazy").then((d) => d.Route));
