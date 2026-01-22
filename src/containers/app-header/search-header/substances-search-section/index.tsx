import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useSearch } from "@tanstack/react-router";
import axios from "axios";

import { SearchSection } from "../../../search-section";

export const SubstancesSearchSection = () => {
  const { page, title, ceillineName } = useSearch({
    from: "/search/substances",
  });
  const search = useStore((s) => s.search);
  const setLoading = useStore((s) => s.setLoading);
  const setSearch = useStore((s) => s.setSearch);
  const setSubstances = useStore((s) => s.setSubstances);
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
          ...(ceillineName ? { filterInnerQuery: { ceillineName } } : {}),
        },
      );

      setSubstances(data.data);
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
    ceillineName,
    setLoading,
    setSubstances,
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
      className="w-full md:w-[936px] max-w-2xl"
      onChange={(queryStr) => setSearch({ ...search, queryStr })}
      onSearch={handleSearch}
    />
  );
};
