import { useCallback, useState } from "react";
import { useStore } from "@store";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchSection } from "../../../search-section";
import { ENUM_SEARCH_FIELD_TYPE, type TTabValue } from "@types";
import { SubstanceDrawer } from "../../../substance-drawer";

export const SubstancesSearchSection = () => {
  const { queryStr } = useSearch({
    from: "/search/substances",
  });
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTab] = useState<TTabValue>("substances");

  const getItems = useCallback((_queryStr: any) => {
    navigate({
      to: "/substances", search: {
        page: 1,
        queryStr: _queryStr,
      }
    });
  }, [
    queryStr,
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
    getItems(_queryStr);
  };

  return (
    <>
      <SearchSection
        hasSearchField={false}
        onDrawerClick={() => setOpen(true)}
        className="w-full md:w-[936px] max-w-4xl"
        initialValue={queryStr}
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
