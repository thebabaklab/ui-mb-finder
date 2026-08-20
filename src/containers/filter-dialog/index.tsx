import { mdiClose } from "@mdi/js";
import { useStore } from "@store";
import { useMatches } from "@tanstack/react-router";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icon,
} from "@ui-kit";

import { BioDataSidebar } from "../app-sidebar/bio-data-sidebar";
import { CellLinesSidebar } from "../app-sidebar/cell-lines-sidebar";
import { ReferencesSidebar } from "../app-sidebar/references-sidebar";
import { SubstancesSidebar } from "../app-sidebar/substances-sidebar";

export const FilterDialog = () => {
  const dialogs = useStore((s) => s.dialogs);
  const setDialogs = useStore((s) => s.setDialogs);
  const matches = useMatches();
  const isSubstances = matches.some(
    (match) => match.routeId === "/search/substances",
  );
  const isCellLines = matches.some(
    (match) => match.routeId === "/search/cell-lines",
  );
  const isBioData = matches.some(
    (match) =>
      match.routeId === "/search/cell-lines/bio-data/$cellId" ||
      match.routeId === "/search/substances/bio-data/$imgId",
  );
  const isReferences = matches.some(
    (match) => match.routeId === "/search/references",
  );

  return (
    <Dialog
      open={dialogs.includes("filter")}
      onOpenChange={(value) => setDialogs(value ? ["filter"] : [])}
    >
      <DialogContent
        className="h-screen text-center sm:h-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-primary font-bold text-base w-full text-center">
            Filter
          </DialogTitle>

          <Button
            variant="close_icon"
            size="icon"
            className="-mr-2"
            onClick={() => setDialogs([])}
          >
            <Icon name={mdiClose} />
          </Button>
        </DialogHeader>

        {isSubstances && <SubstancesSidebar />}
        {isCellLines && <CellLinesSidebar />}
        {isBioData && <BioDataSidebar />}
        {isReferences && <ReferencesSidebar />}
      </DialogContent>
    </Dialog>
  );
};
