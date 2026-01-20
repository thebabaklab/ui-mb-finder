import { useStore } from "@store";
import {
  // Link,
  useLocation,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import type { TTabValue } from "@types";

import { AppContainer } from "../../app-container";
import { TotalRecordsSkeleton } from "../../skeletons";
import { TabsSection } from "../../tabs-section";
import { BioDataSearchSection } from "./bio-data-search-section";
import { CellLinesSearchSection } from "./cell-lines-search-section";
import { ReferencesSearchSection } from "./references-search-section";
import { SubstancesSearchSection } from "./substances-search-section";

export const SearchHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const loading = useStore((s) => s.loading);
  const totalRecords = useStore((s) => s.totalRecords);
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

  const handleTabChange = (value: TTabValue) => {
    if (value === "substances")
      navigate({ to: "/substances", search: { page: 1 } });
    else if (value === "cell-lines")
      navigate({ to: "/cell-lines", search: { page: 1 } });
    else if (value === "references")
      navigate({ to: "/references", search: { page: 1 } });
  };

  return (
    <header className="pt-50">
      <AppContainer className="flex flex-col gap-5 items-center">
        <div className="flex flex-col items-center justify-between gap-5 max-w-2xl">
          {/* <Link
            to="/"
            className="relative flex w-[315px] min-w-[315px] flex-col items-center md:h-[100px] md:flex-row"
          >
            <img
              src="/app-logo.png"
              alt="app logo"
              className="-top-10 -right-5 h-[130px] w-[236px] object-cover md:absolute md:h-[200px] md:w-[200px]"
            />
            <div className="text-secondary text-5xl font-semibold md:text-4xl">
              MB Finder
            </div>
          </Link> */}

          <TabsSection
            selectedTab={
              pathname.includes("bio-data")
                ? "cell-lines"
                : (pathname.slice(1) as TTabValue)
            }
            onChange={handleTabChange}
          />

          {isSubstances && <SubstancesSearchSection />}

          {isCellLines && <CellLinesSearchSection />}

          {isBioData && <BioDataSearchSection />}

          {isReferences && <ReferencesSearchSection />}

          {loading ? (
            <TotalRecordsSkeleton />
          ) : (
            <div className="flex gap-2 sm:justify-end text-center text-primary font-light">
              About <b className="font-bold">{totalRecords}</b>
              results for search:
            </div>
          )}
        </div>

        {/* <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-0"> */}
          {/* <TabsSection
            selectedTab={
              pathname.includes("bio-data")
                ? "cell-lines"
                : (pathname.slice(1) as TTabValue)
            }
            onChange={handleTabChange}
          /> */}

          {/* {loading ? (
            <TotalRecordsSkeleton />
          ) : (
            <div className="flex gap-2 sm:justify-end">
              About <b>{totalRecords}</b>
              results for search:
            </div>
          )} */}
        {/* </div> */}

        {/* <div className="bg-border h-[1px]"></div> */}
      </AppContainer>
    </header>
  );
};
