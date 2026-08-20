import { useStore } from "@store";
import {
  Link,
  useLocation,
  useMatches,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import type { TTabValue } from "@types";

import { AppContainer } from "../../app-container";
import { TotalRecordsSkeleton } from "../../skeletons";
import { TabsSection } from "../../tabs-section";
import { BioDataSearchSection } from "./bio-data-search-section";
import { CellLinesSearchSection } from "./cell-lines-search-section";
import { ReferencesSearchSection } from "./references-search-section";
import { SubstancesSearchSection } from "./substances-search-section";
import predictLogo from "@assets/img/predict-icon.svg";

export const SearchHeader = () => {
  const navigate = useNavigate();
  const { queryStr } = useSearch({ strict: false });
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
    (match) =>
      match.routeId === "/search/cell-lines/bio-data/$cellId" ||
      match.routeId === "/search/substances/bio-data/$imgId",
  );
  const isReferences = matches.some(
    (match) => match.routeId === "/search/references",
  );

  const handleTabChange = (value: TTabValue) => {
    if (value === "substances")
      navigate({ to: "/substances", search: { page: 1, queryStr: queryStr } });
    else if (value === "cell-lines")
      navigate({ to: "/cell-lines", search: { page: 1, queryStr: queryStr } });
    else if (value === "references")
      navigate({ to: "/references", search: { page: 1, queryStr: queryStr } });
  };

  return (
    <header className="pt-30">
      <AppContainer className="flex flex-col gap-5 items-center">
        <div className="flex flex-col items-center justify-between gap-5 lg:max-w-5xl">
          <TabsSection
            selectedTab={
              pathname.includes("bio-data")
                ? pathname.startsWith("/substances")
                  ? "substances"
                  : "cell-lines"
                : (pathname.slice(1) as TTabValue)
            }
            onChange={handleTabChange}
          />

          {/* Streamlit app page */}
          <Link to="/predict-activity" className="flex items-center text-white font-light mb-2 block lg:hidden">
            <img src={predictLogo} className="w-8 inline mr-2" />
            Predict Activity
          </Link>

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
      </AppContainer>
    </header>
  );
};
