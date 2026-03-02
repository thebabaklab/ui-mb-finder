import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { searchRoute } from "../search";

export const substancesRoute = createRoute({
  getParentRoute: () => searchRoute,
  path: "/substances",
  validateSearch: z.object({
    page: z.number().optional(),
    title: z.string().optional(),
    queryStr: z.string().optional(),
    ceillineName: z.string().optional(),
    smiles: z.string().optional(),
    cliDrug: z.array(z.string()).optional(),
    cas: z.string().optional(),
    incuTime: z.array(z.number()).optional(),
    incuOther: z.string().optional(),
    weightStart: z.number().optional(),
    weightEnd: z.number().optional(),
  }),
}).lazy(() => import("./substances.lazy").then((d) => d.Route));
