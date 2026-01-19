import { BioDataPage } from "@pages";
import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/search/cell-lines/bio-data/$cellId")({
  component: BioDataPage,
});
