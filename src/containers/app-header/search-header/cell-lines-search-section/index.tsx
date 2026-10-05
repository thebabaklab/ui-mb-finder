import { useCallback } from "react";
import { useTissues } from "@hooks";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchSection, cellLineSearchByOptions } from "../../../search-section";
import { ENUM_CANCER_STATUS, ENUM_CELL_LINE_SEARCH_BY, ENUM_SPECIES } from "@types";

export const CellLinesSearchSection = () => {
  const { queryStr, searchBy, cancerStatus, species } = useSearch({ from: "/search/cell-lines" });
  const navigate = useNavigate();

  const activeSearchBy = searchBy ?? ENUM_CELL_LINE_SEARCH_BY.CellLine;
  const activeCancerStatus = cancerStatus ?? ENUM_CANCER_STATUS.All;
  const activeSpecies = species ?? ENUM_SPECIES.All;
  const isTissue = activeSearchBy === ENUM_CELL_LINE_SEARCH_BY.Tissue;
  const { tissues, loading: tissuesLoading } = useTissues(isTissue);

  const getItems = useCallback((
    _queryStr: any,
    _searchBy: string,
    _cancerStatus: string = activeCancerStatus,
    _species: string = activeSpecies,
  ) => {
    navigate({
      to: "/cell-lines", search: {
        page: 1,
        queryStr: _queryStr,
        searchBy: _searchBy,
        // All is the default for both, so it stays out of the URL.
        cancerStatus: _cancerStatus === ENUM_CANCER_STATUS.All ? undefined : _cancerStatus,
        species: _species === ENUM_SPECIES.All ? undefined : _species,
      }
    });
  }, [
    navigate,
    activeCancerStatus,
    activeSpecies,
  ]);

  const handleSearch = (_queryStr: any) => {
    getItems(_queryStr, activeSearchBy);
  };

  return (
    <SearchSection
      hasSearchField={false}
      className="w-full md:w-[936px] max-w-4xl"
      initialValue={queryStr}
      searchBy={activeSearchBy}
      searchByOptions={cellLineSearchByOptions}
      valueOptions={isTissue ? tissues : undefined}
      valueOptionsLoading={tissuesLoading}
      onSearchByChange={(value) => getItems(undefined, value)}
      cancerStatus={activeCancerStatus}
      // Applies at once, like changing the field: the results already on the
      // page are what it narrows.
      onCancerStatusChange={(value, typed) => getItems(typed, activeSearchBy, value)}
      species={activeSpecies}
      onSpeciesChange={(value, typed) => getItems(typed, activeSearchBy, activeCancerStatus, value)}
      onSearch={(value: any) => handleSearch(value)}
    />
  );
};
