import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useNavigate, useSearch } from "@tanstack/react-router";
import axios from "axios";

import { AuthorFilter } from "../author-filter";
import { PublicationYearFilter } from "../publication-year-filter";
import { DoiFilter } from "../doi-filter";
import { ENUM_SEARCH_FIELD_TYPE } from "@types";
import { ClinicalDrugFilter } from "../clinical-drug-filter";

export const ReferencesSidebar = () => {
  // const { page, ceillineName, imgId } = useSearch({
  const { page, imgId, author, pyearStart, pyearEnd, doi, cliDrug } = useSearch({
    from: "/search/references",
  });
  const navigate = useNavigate()
  // const search = useStore((s) => s.search);
  // const setLoading = useStore((s) => s.setLoading);
  // const setReferences = useStore((s) => s.setReferences);
  // const setTotalPages = useStore((s) => s.setTotalPages);
  // const setTotalRecords = useStore((s) => s.setTotalRecords);
  // const currentPage = useMemo(() => Number(page), [page]);

  // const getItems = useCallback(async () => {
  const getItems = useCallback((newFilters: Partial<{
    author: string;
    pyearStart: number;
    pyearEnd: number;
    doi: string;
    cliDrug: string[];
  }>) => {
    // try {
    // setLoading(true);

    // const author_filter = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.Author)?.filterValue;
    // const pyearStart_filter = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.PublicationYear)?.filterValue.startYear;
    // const pyearEnd_filter = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.PublicationYear)?.filterValue.endYear;
    // const doi_filter = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.Doi)?.filterValue;
    // const cliDrug_filter = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug)?.filterValue;

    // const { data } = await axios.post(
    //   `https://stage-api.mb-finder.org/api/v2/get-references`,
    //   {
    //     ...search,
    //     currentPage,
    //     // ...(ceillineName ? { ceillineName } : {}),
    //     // ...(imgId ? { imgId } : {}),
    //     imgId,
    //   },
    // );

    // setReferences(data.data);
    // setTotalPages(data.meta.last_page);
    // setTotalRecords(data.meta.total);
    console.log(newFilters);
    
    navigate({
      to: "/references", search: {
        page: 1,
        imgId: imgId,
        ...newFilters,
        // author: author,
        // pyearStart: pyearStart_filter ? Number(pyearStart_filter) : undefined,
        // pyearEnd: pyearEnd_filter ? Number(pyearEnd_filter) : undefined,
        // doi: doi_filter,
        // cliDrug: cliDrug_filter
      }
    });
    // } catch (err) {
    //   console.error("Error", err);
    // } finally {
    //   setLoading(false);
    // }
  }, [
    // search,
    // currentPage,
    // ceillineName,
    imgId,
    navigate
    // author,
    // pyearStart,
    // pyearEnd,
    // doi,
    // cliDrug,
    // setLoading,
    // setReferences,
    // setTotalPages,
    // setTotalRecords,
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <AuthorFilter initialValue={author} onSubmit={(value) => getItems({ author: value })} />

      {/* <PublicationYearFilter onSubmit={getItems} /> */}

      {/* <DoiFilter onSubmit={getItems} /> */}

      {/* <ClinicalDrugFilter onSubmit={getItems} /> */}
    </div>
  );
};
