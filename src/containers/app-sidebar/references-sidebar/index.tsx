import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { AuthorFilter } from "../author-filter";
import { PublicationYearFilter } from "../publication-year-filter";
import { DoiFilter } from "../doi-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";

export const ReferencesSidebar = () => {
  const { imgId, author, pyearStart, pyearEnd, doi, cliDrug } = useSearch({
    from: "/search/references",
  });
  const navigate = useNavigate()
  const getItems = useCallback((newFilters: Partial<{
    author: string;
    pYear: object;
    doi: string;
    cliDrug: string[];
  }>) => {
    navigate({
      to: "/references", search: (prev) => ({
        ...prev,
        page: 1,
        ...newFilters,
      })
    });
  }, [
    imgId,
    navigate
  ]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <AuthorFilter initialValue={author} onSubmit={(value) => getItems({ author: value })} />

      <PublicationYearFilter start_initialValue={pyearStart} end_initialValue={pyearEnd} onSubmit={(value_years) => getItems({ ...value_years })} />

      <DoiFilter initialValue={doi} onSubmit={(value) => getItems({ doi: value })} />

      <ClinicalDrugFilter initialValue={cliDrug} onSubmit={(value) => getItems({ cliDrug: value as string[] })} />
    </div>
  );
};
