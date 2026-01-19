import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useSearch } from "@tanstack/react-router";
import axios from "axios";

import { AuthorFilter } from "../author-filter";
import { PublicationYearFilter } from "../publication-year-filter";
import { DoiFilter } from "../doi-filter";

export const ReferencesSidebar = () => {
  const { page, ceillineName, imgId } = useSearch({
    from: "/search/references",
  });
  const search = useStore((s) => s.search);
  const setLoading = useStore((s) => s.setLoading);
  const setReferences = useStore((s) => s.setReferences);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => Number(page), [page]);

  const getItems = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://stage-api.mb-finder.com/api/v2/get-references`,
        {
          ...search,
          currentPage,
          ...(ceillineName ? { ceillineName } : {}),
          ...(imgId ? { imgId } : {}),
        },
      );

      setReferences(data.data);
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
    ceillineName,
    imgId,
    setLoading,
    setReferences,
    setTotalPages,
    setTotalRecords,
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <AuthorFilter onSubmit={getItems} />

      <PublicationYearFilter onSubmit={getItems} />

      <DoiFilter onSubmit={getItems} />
    </div>
  );
};
