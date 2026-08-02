import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  BioDataCard,
  BioDataCardSkeleton,
  FilterDialog,
  FullscreenImageDialog,
  NoDataFound,
  PaginationSection,
} from "@containers";
import { mdiChevronLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { API_BASE_URL } from "@utils";
import { useParams, useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import axios from "axios";
import { buildFilters } from "../substances";

export const BioDataPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { page, filters: filtersString } = useSearch({ from: "/search/cell-lines/bio-data/$cellId" });
  const search = useStore((s) => s.search);
  const canFetch = useRef(true);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const bioDatas = useStore((s) => s.bioDatas);
  const setBioDatas = useStore((s) => s.setBioDatas);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const setDialogs = useStore((s) => s.setDialogs);
  const currentPage = useMemo(() => {
    canFetch.current = true;
    return Number(page);
  }, [page]);

  const getCellLinesBioData = useCallback(async () => {
    try {
      setLoading(true);
      let apiFilters = null;

      if (filtersString)
        apiFilters = buildFilters(JSON.parse(filtersString));


      const { data } = await axios.post(
        `${API_BASE_URL}/api/v2/get-ceil-line-bio-data`,
        {
          ...search,
          currentPage,
          cellId,
          filters: apiFilters ? apiFilters : {},
          // filters
        },
      );
      setBioDatas(Array.isArray(data?.data) ? data.data : []);
      setTotalPages(data?.meta?.last_page ?? 1);
      setTotalRecords(data?.meta?.total ?? 0);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, cellId, filtersString]);
  // }, [search, currentPage, cellId, incuTime, incuOther, icStart, icEnd]);

  useEffect(() => {
    void getCellLinesBioData();
  }, [page, cellId, filtersString]);
  // }, [page, cellId, incuTime, incuOther, icStart, icEnd]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
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
          <BioDataCardSkeleton />
          <BioDataCardSkeleton />
          <BioDataCardSkeleton />
        </>
      ) : bioDatas.length ? (
        <>
          {bioDatas.map((bioData, i) => (
            <BioDataCard key={i} bioData={bioData} index={search.size * (currentPage - 1) + i + 1} />
          ))}

          {!!bioDatas.length && totalPages > 1 && (
            <PaginationSection currentPage={page || 0} length={totalPages} />
          )}

          <FullscreenImageDialog />
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
