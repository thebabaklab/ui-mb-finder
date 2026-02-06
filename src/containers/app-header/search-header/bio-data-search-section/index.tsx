import { useCallback, useMemo, useState } from "react";

import { useStore } from "@store";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import axios from "axios";

import { SearchSection } from "../../../search-section";
import { ENUM_SEARCH_FIELD_TYPE, type TTabValue } from "@types";
import { SubstanceDrawer } from "../../../substance-drawer";

export const BioDataSearchSection = () => {
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { page, title, imgId } = useSearch({
    from: "/search/cell-lines/bio-data/$cellId",
  });
  const search = useStore((s) => s.search);
  const setLoading = useStore((s) => s.setLoading);
  const setSearch = useStore((s) => s.setSearch);
  const setBioDatas = useStore((s) => s.setBioDatas);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => Number(page), [page]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTab] = useState<TTabValue>("substances");

  const getItems = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://api.mb-finder.org/api/v1/get-substances`,
        {
          ...search,
          currentPage,
          ...(title ? { title } : {}),
          ...(imgId ? { imgId } : {}),
          ...(cellId ? { cellId } : {}),
        },
      );

      setBioDatas(data.data);
      setTotalPages(data.meta.last_page);
      setTotalRecords(data.meta.total);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [
    search,
    currentPage,
    title,
    imgId,
    cellId,
    setLoading,
    setBioDatas,
    setTotalPages,
    setTotalRecords,
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

  const handleSearch = () => {
    getItems();
  };

  return (
    <>
      <SearchSection
        search={search}
        hasSearchField={false}
        onDrawerClick={() => setOpen(true)}
        className="w-full md:w-[936px] max-w-2xl"
        onChange={(queryStr) => setSearch({ ...search, queryStr })}
        onSearch={handleSearch}
      />

      <SubstanceDrawer
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleDrawerSubmit}
      />
    </>
  );
};
