import { useCallback, useEffect, useState } from "react";
import {
  BioDataCard,
  BioDataCardSkeleton,
  FilterDialog,
  FullscreenImageDialog,
  NoDataFound,
  PaginationSection,
} from "@containers";
import { mdiChevronLeft, mdiClose, mdiFileDocumentOutline, mdiFilterOutline } from "@mdi/js";
import type { TBioDataPaper } from "@types";
import { useStore } from "@store";
import { API_BASE_URL } from "@utils";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import axios from "axios";
import { buildFilters } from "../substances";
import { PaperPicker } from "./paper-picker";

// Bio data is scoped either to one cell line (cellId) or to one substance (imgId),
// in which case every cell line that substance was tested on is listed.
type BioDataScope = { cellId: string } | { imgId: string };

interface BioDataViewProps {
  scope: BioDataScope;
  page?: number;
  filtersString?: string;
  // Narrows a substance's bio data to one paper (only used with the imgId scope).
  paperId?: string;
}

export const BioDataView = ({ scope, page, filtersString, paperId }: BioDataViewProps) => {
  const {
    history: { back },
  } = useRouter();
  const navigate = useNavigate();
  const search = useStore((s) => s.search);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const bioDatas = useStore((s) => s.bioDatas);
  const setBioDatas = useStore((s) => s.setBioDatas);
  const totalPages = useStore((s) => s.totalPages);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const setDialogs = useStore((s) => s.setDialogs);
  const currentPage = Number(page);
  const scopeKey = "cellId" in scope ? scope.cellId : scope.imgId;
  const imgId = "imgId" in scope ? scope.imgId : undefined;
  const [papers, setPapers] = useState<TBioDataPaper[]>([]);
  const [papersLoading, setPapersLoading] = useState(false);

  const getBioData = useCallback(async () => {
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
          ...scope,
          paper_id: paperId,
          filters: apiFilters ? apiFilters : {},
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
  }, [search, currentPage, scopeKey, filtersString, paperId]);

  useEffect(() => {
    void getBioData();
  }, [page, scopeKey, filtersString, paperId]);

  // A substance's papers for the picker, under the same filters as the cards so
  // each paper's count matches what picking it shows. Not refetched on paging
  // or on picking a paper: neither changes the list.
  useEffect(() => {
    if (!imgId) return;

    let cancelled = false;
    setPapersLoading(true);

    axios
      .post(`${API_BASE_URL}/api/v2/get-bio-data-papers`, {
        imgId,
        filters: filtersString ? buildFilters(JSON.parse(filtersString)) : {},
      })
      .then(({ data }) => {
        if (!cancelled) setPapers(Array.isArray(data?.data) ? data.data : []);
      })
      .catch((err) => console.error("Error", err))
      .finally(() => {
        if (!cancelled) setPapersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [imgId, filtersString]);

  const choosePaper = (nextPaperId: string | undefined) => {
    navigate({ to: ".", search: (prev: Record<string, unknown>) => ({ ...prev, page: 1, paperId: nextPaperId }) });
  };

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

      {imgId && (
        <div className="border-primary flex flex-col gap-3 rounded-4xl border px-4 py-4 text-white font-light sm:px-6">
          {/* Titles are long, so the picker gets the full width on its own row. */}
          <div className="flex min-h-10 items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Icon name={mdiFileDocumentOutline} color="primary" />
              <span className="text-primary font-bold">Paper</span>
            </div>

            {paperId && (
              <Button variant="back" size="small" className="w-fit shrink-0 text-base font-light px-4 py-2" onClick={() => choosePaper(undefined)}>
                <Icon name={mdiClose} color="current" dense />
                Show all papers
              </Button>
            )}
          </div>

          <PaperPicker papers={papers} value={paperId} loading={papersLoading} onChange={choosePaper} />
        </div>
      )}

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
