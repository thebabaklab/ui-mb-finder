import { useCallback, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchSection } from "../../../search-section";
import { ENUM_SEARCH_BY } from "@types";
import { SubstanceDrawer } from "../../../substance-drawer";

export const SubstancesSearchSection = () => {
  const { queryStr, searchBy } = useSearch({
    from: "/search/substances",
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const activeSearchBy = searchBy ?? ENUM_SEARCH_BY.Name;

  const getItems = useCallback((_queryStr: any, _searchBy: string) => {
    navigate({
      to: "/substances", search: {
        page: 1,
        queryStr: _queryStr,
        searchBy: _searchBy,
      }
    });
  }, [
    navigate,
  ]);

  const handleDrawerSubmit = (smiles: string) => {
    setOpen(false);
    getItems(smiles, ENUM_SEARCH_BY.Smiles);
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
