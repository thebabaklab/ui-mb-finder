import { createRoute } from "@tanstack/react-router";
import { z } from "zod";

import { rootRoute } from "../__root";

export const mainRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  // Which search tab to open on. Left out for Substances, the default; the
  // tabs on a results page link here with theirs.
  validateSearch: z.object({
    tab: z.enum(["substances", "cell-lines", "references"]).optional(),
  }),
}).lazy(() => import("./main.lazy").then((d) => d.Route));
