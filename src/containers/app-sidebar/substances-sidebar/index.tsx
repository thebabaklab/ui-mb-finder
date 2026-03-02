import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CasRegistryNumberFilter } from "../cas-registry-number-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { MolecularWeightFilter } from "../molecular-weight-filter";
import { SmilesFilter } from "../smiles-filter";

export const SubstancesSidebar = () => {
  const { title, ceillineName, smiles, cliDrug, cas, incuTime, incuOther, weightStart, weightEnd } = useSearch({ from: "/search/substances" });
  const navigate = useNavigate();

  const getItems = useCallback((newFilters: Partial<{
    smiles: string;
    cliDrug: string[];
    cas: string;
    incuTime: number[];
    incuOther: string;
    weightStart: number;
    weightEnd: number;
  }>) => {
    navigate({
      to: "/substances", search: (prev) => ({
        ...prev,
        page: 1,
        ...newFilters,
      })
    });
  }, [title, ceillineName, navigate]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <SmilesFilter initialValue={smiles} onSubmit={(value) => getItems({ smiles: value })} />

      <ClinicalDrugFilter initialValue={cliDrug} onSubmit={(value) => getItems({ cliDrug: value as string[] })} />

      <CasRegistryNumberFilter initialValue={cas} onSubmit={(value) => getItems({ cas: value })} />

      <IncubationTimeFilter inititalOtherValue={incuOther} initialSelectedValues={incuTime} onSubmit={(value_time, value_other) => getItems({ incuTime: value_time, incuOther: value_other })} />

      <MolecularWeightFilter initialweightStart={weightStart} initialweightEnd={weightEnd} onSubmit={(value_wStart, value_wEnd) => getItems({ weightStart: value_wStart, weightEnd: value_wEnd })} />
    </div>
  );
};
