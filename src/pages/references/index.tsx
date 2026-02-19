import { useCallback, useEffect } from "react";

import { FilterDialog, NoDataFound, PaginationSection, ReferenceCard, ReferenceCardSkeleton } from "@containers";
import { mdiChevronLeft, mdiFilterOutline } from "@mdi/js";
import { useStore } from "@store";
import { useRouter, useSearch } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";
import axios from "axios";
import { ENUM_SEARCH_FIELD_TYPE } from "@types";

export const ReferencesPage = () => {
  const {
    history: { back },
  } = useRouter();
  const { page, imgId, queryStr, author, pyearStart, pyearEnd, doi, cliDrug } = useSearch({ from: "/search/references" });
  const setDialogs = useStore((s) => s.setDialogs);
  const search = useStore((s) => s.search);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const references = useStore((s) => s.references);
  const setReferences = useStore((s) => s.setReferences);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = Number(page);

  const getReferences = useCallback(async () => {
    try {
      setLoading(true);
      const filters = [];
      const dateFilter: Partial<{
        startYear: number;
        endYear: number;
      }> = {}

      if (author)
        filters.push({
          filterType: ENUM_SEARCH_FIELD_TYPE.Author, filterValue: author
        });

      if (pyearStart || pyearEnd) {
        if (pyearStart)
          dateFilter.startYear = pyearStart;
        if (pyearEnd)
          dateFilter.endYear = pyearEnd;

        filters.push({
          filterType: ENUM_SEARCH_FIELD_TYPE.PublicationYear, filterValue: dateFilter
        })
      }

      if (doi)
        filters.push({
          filterType: ENUM_SEARCH_FIELD_TYPE.Doi, filterValue: doi
        });

      if (cliDrug?.length)
        filters.push({
          filterType: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug, filterValue: cliDrug
        });

      const { data } = await axios.post("https://stage-api.mb-finder.org/api/v2/get-references", {
        ...search,
        queryStr,
        currentPage,
        imgId,
        filters,
      });
      setReferences(data.data);
      setTotalPages(data.meta.last_page);
      setTotalRecords(data.meta.total);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, imgId, queryStr, author, pyearStart, pyearEnd, doi, cliDrug]);

  useEffect(() => {
    void getReferences();
  }, [page, queryStr, imgId, author, pyearStart, pyearEnd, doi, cliDrug]);

  return (
    <div className="flex flex-col gap-5">
      <div className={cn("flex", imgId || queryStr || author || pyearStart || pyearEnd || doi || cliDrug ? "justify-between" : "justify-end lg:hidden")}>
        {(imgId || queryStr || author || pyearStart || pyearEnd || doi || cliDrug) && (
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
          <ReferenceCardSkeleton />
          <ReferenceCardSkeleton />
          <ReferenceCardSkeleton />
        </>
      ) : references.length ? (
        <>
          {references.map((reference, i) => (
            <ReferenceCard key={i} reference={reference} index={search.size * (currentPage - 1) + i + 1} />
          ))}

          {!!references.length && totalPages > 1 && <PaginationSection currentPage={page || 0} length={totalPages} />}
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
