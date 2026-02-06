import { useCallback, useMemo } from "react";

import { useStore } from "@store";
import { useSearch } from "@tanstack/react-router";
import axios from "axios";

import { CasRegistryNumberFilter } from "../cas-registry-number-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { MolecularWeightFilter } from "../molecular-weight-filter";
import { SmilesFilter } from "../smiles-filter";

export const SubstancesSidebar = () => {
  const { page, title, ceillineName } = useSearch({ from: "/search/substances" });
  const search = useStore((s) => s.search);
  const setLoading = useStore((s) => s.setLoading);
  const setSubstances = useStore((s) => s.setSubstances);
  const setTotalPages = useStore((s) => s.setTotalPages);
  const setTotalRecords = useStore((s) => s.setTotalRecords);
  const currentPage = useMemo(() => Number(page), [page]);

  const getItems = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`https://api.mb-finder.org/api/v1/get-substances`, {
        ...search,
        currentPage,
        ...(title ? { title } : {}),
        ...(ceillineName ? { ceillineName } : {}),
      });

      setSubstances(data.data);
      setTotalPages(data.meta.last_page);
      setTotalRecords(data.meta.total);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, title, ceillineName, setLoading, setSubstances, setTotalPages, setTotalRecords]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <SmilesFilter onSubmit={getItems} />

      <ClinicalDrugFilter onSubmit={getItems} />

      <CasRegistryNumberFilter onSubmit={getItems} />

      <IncubationTimeFilter onSubmit={getItems} />

      <MolecularWeightFilter onSubmit={getItems} />
    </div>
  );
};
