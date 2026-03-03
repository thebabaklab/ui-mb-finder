import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CasRegistryNumberFilter } from "../cas-registry-number-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { MolecularWeightFilter } from "../molecular-weight-filter";
import { SmilesFilter } from "../smiles-filter";
import { Button } from "@ui-kit";

export const SubstancesSidebar = () => {
  const { title, ceillineName, smiles, cliDrug, cas, incuTime, incuOther, weightStart, weightEnd } = useSearch({ from: "/search/substances" });
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    smiles: smiles,
    cliDrug: cliDrug ?? [],
    cas: cas,
    incuTime: incuTime ?? [],
    incuOther: incuOther,
    weightStart: weightStart,
    weightEnd: weightEnd
  });

  const applyFilters = () => {
    navigate({
      to: "/substances", search: (prev) => ({
        ...prev,
        page: 1,
        ...filters,
      })
    });
  }

  useEffect(() => {
    setFilters({
      smiles: smiles,
      cliDrug: cliDrug ?? [],
      cas: cas,
      incuTime: incuTime ?? [],
      incuOther: incuOther,
      weightStart: weightStart ?? 0,
      weightEnd: weightEnd ?? 0
    });
  }, [title, ceillineName, smiles, cliDrug, cas, incuTime, incuOther, weightStart, weightEnd]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      <SmilesFilter initialValue={filters.smiles} onChange={(value) => setFilters((prev) => ({ ...prev, smiles: value }))} />

      <ClinicalDrugFilter initialValue={filters.cliDrug} onChange={(value) => setFilters((prev) => ({ ...prev, cliDrug: value as string[] }))} />

      <CasRegistryNumberFilter initialValue={filters.cas} onChange={(value) => setFilters((prev) => ({ ...prev, cas: value }))} />

      <IncubationTimeFilter inititalOtherValue={filters.incuOther} initialSelectedValues={filters.incuTime} onChange={(values) => setFilters((prev) => ({ ...prev, incuTime: values }))} onOtherChange={(value) => setFilters((prev) => ({ ...prev, incuOther: value }))} />

      <MolecularWeightFilter initialweightStart={filters.weightStart} initialweightEnd={filters.weightEnd} onChange={(values_weight) => setFilters((prev) => ({ ...prev, ...values_weight }))} />
    </div>
  );
};
