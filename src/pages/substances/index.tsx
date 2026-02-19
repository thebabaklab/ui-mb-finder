import { useCallback, useEffect } from "react";
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
  const { page, title, ceillineName, queryStr } = useSearch({ from: "/search/substances", });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const substances = useStore((s) => s.substances);
  const setSubstances = useStore((s) => s.setSubstances);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = Number(page);

  const getSubstances = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://stage-api.mb-finder.org/api/v2/get-substances",
        {
          ...search,
          queryStr,
          currentPage,
          paper_id: title,
          ceil_line_name: ceillineName,
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
  }, [search, currentPage, title, ceillineName, queryStr]);

  useEffect(() => {
    void getSubstances();
  }, [page, title, ceillineName, queryStr]);

  return (
    <div className="flex flex-col gap-5">
      <div
        className={cn(
          "flex",
          queryStr || title || ceillineName ? "justify-between" : "justify-end lg:hidden",
        )}
      >
        {(queryStr || title || ceillineName) && (
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
            <SubstanceCard key={i + 1} substance={substance} index={search.size * (currentPage - 1) + i + 1} />
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
