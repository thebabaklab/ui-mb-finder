import { CellLinesPage } from "@pages";
import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/search/cell-lines")({
  component: CellLinesPage,
});
