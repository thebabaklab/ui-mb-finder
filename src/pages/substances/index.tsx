import { useCallback, useEffect, useMemo, useRef } from "react";

import {
  FilterDialog,
  FullscreenImageDialog,
  NoDataFound,
  PaginationSection,
  SubstanceCard,
  SubstanceCardSkeleton,
} from "@containers";
import { mdiChevronLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";
import axios from "axios";

export const SubstancesPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { page, title, ceillineName } = useSearch({
    from: "/search/substances",
  });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const canFetch = useRef(true);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const substances = useStore((s) => s.substances);
  const setSubstances = useStore((s) => s.setSubstances);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => {
    canFetch.current = true;
    return Number(page);
  }, [page]);

  const getSubstances = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://api.mb-finder.org/api/v1/get-substances",
        {
          ...search,
          currentPage,
          title,
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

  useEffect(() => {
    if (canFetch.current) {
      canFetch.current = false;
      void getSubstances();
    }
  }, [getSubstances]);

  return (
    <div className="flex flex-col gap-5">
      <div
        className={cn(
          "flex",
          title || ceillineName ? "justify-between" : "justify-end lg:hidden",
        )}
      >
        {(title || ceillineName) && (
          <Button variant="back" size="small" className="w-fit text-base font-light pl-2 pr-4 py-2" onClick={() => back()}>
            <Icon name={mdiChevronLeft} color="current" large />
            Back
          </Button>
        )}

        <Button variant="back" size="small" className="w-fit text-base font-light px-4 py-2 lg:hidden" onClick={() => setDialogs(["filter"])}>
          <Icon name={mdiFilterOutline} color="current" dense />
          Filter
        </Button>

        <FilterDialog />
      </div>

      {loading ? (
        <>
          <SubstanceCardSkeleton />
          <SubstanceCardSkeleton />
          <SubstanceCardSkeleton />
        </>
      ) : substances.length ? (
        <>
          {substances.map((substance, i) => (
            <SubstanceCard key={i} substance={substance} index={i} />
          ))}

          {!!substances.length && totalPages > 1 && (
            <PaginationSection currentPage={page || 1} length={totalPages} />
          )}

          <FullscreenImageDialog />
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
