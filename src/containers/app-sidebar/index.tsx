import { useMatches } from "@tanstack/react-router";

import { BioDataSidebar } from "./bio-data-sidebar";
import { CellLinesSidebar } from "./cell-lines-sidebar";
import { ReferencesSidebar } from "./references-sidebar";
import { SubstancesSidebar } from "./substances-sidebar";

export const AppSidebar = () => {
  const matches = useMatches();
  const isSubstances = matches.some(
    (match) => match.routeId === "/search/substances",
  );
  const isCellLines = matches.some(
    (match) => match.routeId === "/search/cell-lines",
  );
  const isBioData = matches.some(
    (match) => match.routeId === "/search/cell-lines/bio-data/$cellId",
  );
  const isReferences = matches.some(
    (match) => match.routeId === "/search/references",
  );

  return (
    <aside className="border-primary hidden w-[260px] min-w-[260px] overflow-auto rounded-4xl border lg:block overflow-visible">
      <h3 className="text-gunmetal text-base bg-primary font-bold rounded-full py-5 px-6">
        Filter
      </h3>

      {isSubstances && <SubstancesSidebar />}
      {isCellLines && <CellLinesSidebar />}
      {isBioData && <BioDataSidebar />}
      {isReferences && <ReferencesSidebar />}
    </aside>
  );
};
