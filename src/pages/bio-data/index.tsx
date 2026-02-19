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
import { useParams, useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import axios from "axios";

export const BioDataPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { cellId } = useParams({ from: "/search/cell-lines/bio-data/$cellId" });
  const { page } = useSearch({ from: "/search/cell-lines/bio-data/$cellId" });
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

      const { data } = await axios.post(
        "https://stage-api.mb-finder.org/api/v2/get-ceil-line-bio-data",
        {
          ...search,
          currentPage,
          cellId,
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
    cellId,
  ]);

  useEffect(() => {
    void getCellLinesBioData();
  }, [page, cellId]);

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
