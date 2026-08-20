import { useCallback, useEffect } from "react";
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
import { useRouter } from "@tanstack/react-router";
import { Button, Icon } from "@ui-kit";
import axios from "axios";
import { buildFilters } from "../substances";

// Bio data is scoped either to one cell line (cellId) or to one substance (imgId),
// in which case every cell line that substance was tested on is listed.
type BioDataScope = { cellId: string } | { imgId: string };

interface BioDataViewProps {
  scope: BioDataScope;
  page?: number;
  filtersString?: string;
}

export const BioDataView = ({ scope, page, filtersString }: BioDataViewProps) => {
  const {
    history: { back },
  } = useRouter();
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
  }, [search, currentPage, scopeKey, filtersString]);

  useEffect(() => {
    void getBioData();
  }, [page, scopeKey, filtersString]);

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
