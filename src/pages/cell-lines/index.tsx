import { useCallback, useEffect } from "react";
import { CellLineCard, CellLineCardSkeleton, FilterDialog, NoDataFound, PaginationSection } from "@containers";
import { mdiChevronLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import { API_BASE_URL, cn } from "@utils";
import axios from "axios";
import { buildFilters } from "../substances";

export const CellLinesPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { page, imgId, queryStr, title, filters: filtersString } = useSearch({ from: "/search/cell-lines" });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const cellLines = useStore((s) => s.cellLines);
  const setCellLines = useStore((s) => s.setCellLines);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = Number(page);

  const getCellLines = useCallback(async () => {
    try {
      setLoading(true);
      let apiFilters = null;

      if (filtersString)
        apiFilters = buildFilters(JSON.parse(filtersString));

      const { data } = await axios.post(`${API_BASE_URL}/api/v2/get-cell-lines`, {
        ...search,
        queryStr,
        currentPage,
        imgId,
        paper_id: title,
        filters: apiFilters ? apiFilters : {},
      });
      setCellLines(data.data);
      setTotalPages(data.meta.last_page);
      setTotalRecords(data.meta.total);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, imgId, title, queryStr, filtersString]);
  // }, [search, currentPage, imgId, title, queryStr, incuTime, incuOther, icStart, icEnd]);

  useEffect(() => {
    void getCellLines();
  }, [page, queryStr, imgId, title, filtersString]);
  // }, [page, queryStr, imgId, title, incuTime, incuOther, icStart, icEnd]);

  return (
    <div className="flex flex-col gap-5">
      <div className={cn(
        "flex",
        // queryStr || imgId || title || incuTime || incuOther || icStart || icEnd ? "justify-between" : "justify-end lg:hidden",
        "justify-between"
      )}>
        <Button variant="back" size="small" className="w-fit text-base font-light pl-2 pr-4 py-2" onClick={() => back()}>
          <Icon name={mdiChevronLeft} color="current" large />
          Back
        </Button>

        <Button variant="back" size="small" className="w-fit text-base font-light px-4 py-2 lg:hidden" onClick={() => setDialogs(["filter"])}>
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
            <CellLineCard key={i} cellLine={cellLine} index={search.size * (currentPage - 1) + i + 1} />
          ))}

          {!!cellLines.length && totalPages > 1 && <PaginationSection currentPage={page || 0} length={totalPages} />}
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
