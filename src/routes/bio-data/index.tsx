import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const bioDataRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/cell-lines/bio-data/$cellId",
  validateSearch: z.object({
    page: z.number().optional(),
    imgId: z.string().optional(),
    queryStr: z.string().optional(),
    title: z.string().optional(),
  }),
}).lazy(() => import("./bio-data.lazy").then((d) => d.Route));
