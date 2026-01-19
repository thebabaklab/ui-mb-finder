import { useCallback, useEffect, useMemo, useRef } from "react";

import { FilterDialog, NoDataFound, PaginationSection, ReferenceCard, ReferenceCardSkeleton } from "@containers";
import { mdiArrowLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";
import axios from "axios";

export const ReferencesPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { page, imgId, ceillineName } = useSearch({ from: "/search/references" });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const canFetch = useRef(true);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const references = useStore((s) => s.references);
  const setReferences = useStore((s) => s.setReferences);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => {
    canFetch.current = true;
    Number(page);
  }, [page]);

  const getReferences = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("https://stage-api.mb-finder.com/api/v2/get-references", {
        ...search,
        currentPage,
        imgId,
        ...(ceillineName ? { filterInnerQuery: { ceillineName } } : {}),
      });
      setReferences(data.data);
      setTotalPages(data.meta.last_page);
      setTotalRecords(data.meta.total);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, imgId, ceillineName, setLoading, setReferences, setTotalPages, setTotalRecords]);

  useEffect(() => {
    if (canFetch.current) {
      canFetch.current = false;
      void getReferences();
    }
  }, [getReferences]);

  return (
    <div className="flex flex-col gap-5">
      <div className={cn("flex", imgId || ceillineName ? "justify-between" : "justify-end lg:hidden")}>
        {(imgId || ceillineName) && (
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
          <ReferenceCardSkeleton />
          <ReferenceCardSkeleton />
          <ReferenceCardSkeleton />
        </>
      ) : references.length ? (
        <>
          {references.map((reference, i) => (
            <ReferenceCard key={i} reference={reference} index={i} />
          ))}

          {!!references.length && totalPages > 1 && <PaginationSection currentPage={page || 0} length={totalPages} />}
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
