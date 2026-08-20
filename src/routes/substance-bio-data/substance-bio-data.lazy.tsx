import { SubstanceBioDataPage } from "@pages";
import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/search/substances/bio-data/$imgId")({
  component: SubstanceBioDataPage,
});
