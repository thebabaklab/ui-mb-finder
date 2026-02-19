import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useParams, useSearch } from "@tanstack/react-router";
import axios from "axios";

import { Ic50RangeFilter } from "../ic50-range-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";

export const BioDataSidebar = () => {
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { page } = useSearch({
    from: "/search/cell-lines/bio-data/$cellId",
  });
  const search = useStore((s) => s.search);
  const setLoading = useStore((s) => s.setLoading);
  const setBioDatas = useStore((s) => s.setBioDatas);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => Number(page), [page]);

  const getItems = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://stage-api.mb-finder.org/api/v2/get-ceil-line-bio-data`,
        {
          ...search,
          currentPage,
          // ...(title ? { title } : {}),
          // ...(imgId ? { imgId } : {}),
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
    // title,
    // imgId,
    cellId,
    setLoading,
    setBioDatas,
    setTotalPages,
    setTotalRecords,
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <IncubationTimeFilter onSubmit={getItems} />

      <Ic50RangeFilter onSubmit={getItems} />
    </div>
  );
};
