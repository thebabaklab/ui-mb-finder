import { SubstancesPage } from "@pages";
import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/search/substances")({
  component: SubstancesPage,
});
