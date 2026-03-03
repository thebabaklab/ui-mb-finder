import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { AuthorFilter } from "../author-filter";
import { PublicationYearFilter } from "../publication-year-filter";
import { DoiFilter } from "../doi-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";
import { Button } from "@ui-kit";

export const ReferencesSidebar = () => {
  const { imgId, author, pyearStart, pyearEnd, doi, cliDrug } = useSearch({
    from: "/search/references",
  });
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    author: author,
    pyearStart: pyearStart,
    pyearEnd: pyearEnd,
    doi: doi,
    cliDrug: cliDrug ?? [],
  });

  const applyFilters = () => {
    if (!filters.author && filters.pyearStart === 0 && filters.pyearEnd === 0 && !filters.doi && filters.cliDrug.length === 0) {
      return;
    }

    navigate({
      to: "/references", search: (prev) => ({
        ...prev,
        page: 1,
        ...filters,
      })
    });
  }

  useEffect(() => {
    setFilters({
      author: author,
      pyearStart: pyearStart ?? 0,
      pyearEnd: pyearEnd ?? 0,
      doi: doi,
      cliDrug: cliDrug ?? [],
    });
  }, [imgId, author, pyearStart, pyearEnd, doi, cliDrug]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      <AuthorFilter initialValue={filters.author} onChange={(value) => setFilters((prev) => ({ ...prev, author: value }))} />

      <PublicationYearFilter start_initialValue={filters.pyearStart} end_initialValue={filters.pyearEnd} onChange={(value_years) => setFilters((prev) => ({ ...prev, ...value_years }))} />

      <DoiFilter initialValue={filters.doi} onChange={(value) => setFilters((prev) => ({ ...prev, doi: value }))} />

      <ClinicalDrugFilter initialValue={filters.cliDrug} onChange={(value) => setFilters((prev) => ({ ...prev, cliDrug: value as string[] }))} />
    </div>
  );
};
