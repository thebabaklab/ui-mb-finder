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
    incuTime: z.array(z.number()).optional(),
    incuOther: z.string().optional(),
    icStart: z.number().optional(),
    icEnd: z.number().optional(),
  }),
}).lazy(() => import("./cell-lines.lazy").then((d) => d.Route));
