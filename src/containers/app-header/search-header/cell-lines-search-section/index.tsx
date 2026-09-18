import { useCallback, useState } from "react";
import { useStore } from "@store";
import { useTissues } from "@hooks";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchSection, cellLineSearchByOptions } from "../../../search-section";
import { ENUM_CELL_LINE_SEARCH_BY, ENUM_SEARCH_FIELD_TYPE, type TTabValue } from "@types";
import { SubstanceDrawer } from "../../../substance-drawer";

export const CellLinesSearchSection = () => {
  const { queryStr, searchBy } = useSearch({ from: "/search/cell-lines" });
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTab] = useState<TTabValue>("substances");

  const activeSearchBy = searchBy ?? ENUM_CELL_LINE_SEARCH_BY.CellLine;
  const isTissue = activeSearchBy === ENUM_CELL_LINE_SEARCH_BY.Tissue;
  const { tissues, loading: tissuesLoading } = useTissues(isTissue);

  const getItems = useCallback((_queryStr: any, _searchBy: string) => {
    navigate({
      to: "/cell-lines", search: {
        page: 1,
        queryStr: _queryStr,
        searchBy: _searchBy,
      }
    });
  }, [
    navigate,
  ]);

  const handleDrawerSubmit = (smiles: string) => {
    setSearch({
      ...search,
      filters: [
        { filterType: ENUM_SEARCH_FIELD_TYPE.Smiles, filterValue: smiles },
      ],
    });
    setOpen(false);
    if (selectedTab === "substances")
      navigate({ to: "/substances", search: { page: 1 } });
    else if (selectedTab === "cell-lines")
      navigate({ to: "/cell-lines", search: { page: 1 } });
    else if (selectedTab === "references")
      navigate({ to: "/references", search: { page: 1 } });
  };

  const handleSearch = (_queryStr: any) => {
    getItems(_queryStr, activeSearchBy);
  };

  return (
    <>
      <SearchSection
        hasSearchField={false}
        onDrawerClick={() => setOpen(true)}
        className="w-full md:w-[936px] max-w-4xl"
        initialValue={queryStr}
        searchBy={activeSearchBy}
        searchByOptions={cellLineSearchByOptions}
        valueOptions={isTissue ? tissues : undefined}
        valueOptionsLoading={tissuesLoading}
        onSearchByChange={(value) => getItems(queryStr, value)}
        onSearch={(value: any) => handleSearch(value)}
      />

      <SubstanceDrawer
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleDrawerSubmit}
      />
    </>
  );
};
