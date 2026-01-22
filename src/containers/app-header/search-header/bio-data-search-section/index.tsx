import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useParams, useSearch } from "@tanstack/react-router";
import axios from "axios";

import { SearchSection } from "../../../search-section";

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

  const getItems = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://stage-api.mb-finder.org/api/v2/get-substances`,
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

  const handleSearch = () => {
    getItems();
  };

  return (
    <SearchSection
      search={search}
      hasSearchField={false}
      className="w-full md:w-[936px]"
      onChange={(queryStr) => setSearch({ ...search, queryStr })}
      onSearch={handleSearch}
    />
  );
};
