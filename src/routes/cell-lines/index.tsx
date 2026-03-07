import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const cellLinesRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/cell-lines",
  validateSearch: z.object({
    page: z.number().optional(),
    queryStr: z.string().optional(),
    imgId: z.string().optional(),
    title: z.string().optional(),
    // NEW FILTERS
    filters: z.string().optional(),
    // OLD FILTERS
    incuTime: z.array(z.number()).optional(),
    incuOther: z.string().optional(),
    incuTime_op: z.string().optional(),
    icStart: z.number().optional(),
    icEnd: z.number().optional(),
    ic_op: z.string().optional(),
  }),
}).lazy(() => import("./cell-lines.lazy").then((d) => d.Route));
