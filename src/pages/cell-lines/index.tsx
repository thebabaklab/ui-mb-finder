import { useCallback, useEffect, useMemo, useRef } from "react";

import { CellLineCard, CellLineCardSkeleton, FilterDialog, NoDataFound, PaginationSection } from "@containers";
import { mdiArrowLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";
import axios from "axios";

export const CellLinesPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { page, imgId, title } = useSearch({ from: "/search/cell-lines" });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const canFetch = useRef(true);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const cellLines = useStore((s) => s.cellLines);
  const setCellLines = useStore((s) => s.setCellLines);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => {
    canFetch.current = true;
    return Number(page);
  }, [page]);

  const getCellLines = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("https://stage-api.mb-finder.com/api/v2/get-cell-lines", {
        ...search,
        currentPage,
        imgId,
        title,
      });
      setCellLines(data.data);
      setTotalPages(data.meta.last_page);
      setTotalRecords(data.meta.total);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, imgId, title, setLoading, setCellLines, setTotalPages, setTotalRecords]);

  useEffect(() => {
    if (canFetch.current) {
      canFetch.current = false;
      void getCellLines();
    }
  }, [getCellLines]);

  return (
    <div className="flex flex-col gap-5">
      <div className={cn("flex", imgId || title ? "justify-between" : "justify-end lg:hidden")}>
        {(imgId || title) && (
          <Button variant="outline" size="small" className="w-fit" onClick={() => back()}>
            <Icon name={mdiArrowLeft} color="current" dense />
            Back
          </Button>
        )}

        <Button variant="outline" size="small" className="lg:hidden" onClick={() => setDialogs(["filter"])}>
          <Icon name={mdiFilterOutline} color="current" dense />
          Filter
        </Button>

        <FilterDialog />
      </div>

      {loading ? (
        <>
          <CellLineCardSkeleton />
          <CellLineCardSkeleton />
          <CellLineCardSkeleton />
        </>
      ) : cellLines.length ? (
        <>
          {cellLines.map((cellLine, i) => (
            <CellLineCard key={i} cellLine={cellLine} index={i} />
          ))}

          {!!cellLines.length && totalPages > 1 && <PaginationSection currentPage={page || 0} length={totalPages} />}
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
