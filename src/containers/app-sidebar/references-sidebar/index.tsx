import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { AuthorFilter } from "../author-filter";
import { PublicationYearFilter } from "../publication-year-filter";
import { DoiFilter } from "../doi-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";
import { Button } from "@ui-kit";

export const ReferencesSidebar = () => {
  const { imgId, author, author_op, pyearStart, pyearEnd, pyear_op, doi, doi_op, cliDrug, cliDrug_op } = useSearch({
    from: "/search/references",
  });
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    author: author,
    author_op: author_op,
    pyearStart: pyearStart,
    pyearEnd: pyearEnd,
    pyear_op: pyear_op,
    doi: doi,
    doi_op: doi_op,
    cliDrug: cliDrug ?? [],
    cliDrug_op: cliDrug_op,
  });

  const applyFilters = () => {
    // if (!filters.author && filters.pyearStart === 0 && filters.pyearEnd === 0 && !filters.doi && filters.cliDrug.length === 0) {
    //   return;
    // }

    if (!filters.author)
      filters.author_op = undefined;

    if (!filters.pyearStart && !filters.pyearEnd)
      filters.pyear_op = undefined;
    
    if(!filters.doi)
      filters.doi_op = undefined;

    if(!filters.cliDrug.length)
      filters.cliDrug_op = undefined;

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
      author_op: author_op,
      pyearStart: pyearStart ?? 0,
      pyearEnd: pyearEnd ?? 0,
      pyear_op: pyear_op,
      doi: doi,
      doi_op: doi_op,
      cliDrug: cliDrug ?? [],
      cliDrug_op: cliDrug_op
    });
  }, [imgId, author, author_op, pyearStart, pyearEnd, pyear_op, doi, doi_op, cliDrug, cliDrug_op]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      <AuthorFilter initialValue={filters.author} logicalOperator={filters.author_op} onChange={(value) => setFilters((prev) => ({ ...prev, author: value }))} onLogicalOperatorChange={(value) => setFilters((prev) => ({ ...prev, author_op: value }))} />

      <PublicationYearFilter start_initialValue={filters.pyearStart} end_initialValue={filters.pyearEnd} logicalOperator={filters.pyear_op} onChange={(value_years) => setFilters((prev) => ({ ...prev, ...value_years }))} onLogicalOperatorChange={(value) => setFilters((prev) => ({ ...prev, pyear_op: value }))} />

      <DoiFilter initialValue={filters.doi} logicalOperator={filters.doi_op} onChange={(value) => setFilters((prev) => ({ ...prev, doi: value }))} onLogicalOperatorChange={(value) => setFilters((prev) => ({ ...prev, doi_op: value }))} />

      <ClinicalDrugFilter initialValue={filters.cliDrug} logicalOperator={filters.cliDrug_op} onChange={(value) => setFilters((prev) => ({ ...prev, cliDrug: value as string[] }))} onLogicalOperatorChange={(value) => setFilters((prev) => ({ ...prev, cliDrug_op: value }))} />
    </div>
  );
};
