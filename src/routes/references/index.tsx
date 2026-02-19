import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const referencesRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/references",
  validateSearch: z.object({
    page: z.number().optional(),
    queryStr: z.string().optional(),
    imgId: z.string().optional(),
    author: z.string().optional(),
    pyearStart: z.number().optional(),
    pyearEnd: z.number().optional(),
    doi: z.string().optional(),
    cliDrug: z.array(z.string()).optional()
  }),
}).lazy(() => import("./references.lazy").then((d) => d.Route));
