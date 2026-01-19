import { createRouter } from "@tanstack/react-router";

import { rootRoute } from "./__root";
import { bioDataRoute } from "./bio-data";
import { cellLinesRoute } from "./cell-lines";
import { mainRoute } from "./main";
import { referencesRoute } from "./references";
import { searchRoute } from "./search";
import { substancesRoute } from "./substances";
import { aboutRoute } from "./about-us";
import { contactRoute } from "./contact";

const routeTree = rootRoute.addChildren([
  mainRoute,
  aboutRoute,
  contactRoute,
  searchRoute.addChildren([substancesRoute, cellLinesRoute, bioDataRoute, referencesRoute]),
]);

export const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
