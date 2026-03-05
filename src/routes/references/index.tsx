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
    ceillineName: z.string().optional(),
    author: z.string().optional(),
    author_op: z.string().optional(),
    pyearStart: z.number().optional(),
    pyearEnd: z.number().optional(),
    pyear_op: z.string().optional(),
    doi: z.string().optional(),
    doi_op: z.string().optional(),
    cliDrug: z.array(z.string()).optional(),
    cliDrug_op: z.string().optional(),
  }),
}).lazy(() => import("./references.lazy").then((d) => d.Route));
