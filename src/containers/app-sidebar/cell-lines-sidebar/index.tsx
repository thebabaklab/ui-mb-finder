import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useSearch } from "@tanstack/react-router";
import axios from "axios";

import { CellLinesFilter } from "../cell-lines-filter";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";

export const CellLinesSidebar = () => {
  const { page, title, imgId } = useSearch({ from: "/search/cell-lines" });
  const search = useStore((s) => s.search);
  const setLoading = useStore((s) => s.setLoading);
  const setCellLines = useStore((s) => s.setCellLines);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => Number(page), [page]);

  const getItems = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://stage-api.mb-finder.org/api/v2/get-cell-lines`,
        {
          ...search,
          currentPage,
          ...(title ? { title } : {}),
          ...(imgId ? { imgId } : {}),
        },
      );

      setCellLines(data.data);
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
    setLoading,
    setCellLines,
    setTotalPages,
    setTotalRecords,
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <CellLinesFilter onSubmit={getItems} />

      <IncubationTimeFilter onSubmit={getItems} />

      <Ic50RangeFilter onSubmit={getItems} />
    </div>
  );
};
