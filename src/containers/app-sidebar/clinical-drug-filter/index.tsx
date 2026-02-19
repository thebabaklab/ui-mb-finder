import { type FC, useEffect, useState } from "react";
import { type TClinicalDrug } from "@types";
import { Button } from "@ui-kit";
import { ClinicalDrug } from "../../advanced-search-field/clinical-drug";
import { SearchFilter } from "../../search-filter";

interface ClinicalDrugFilterProps {
  initialValue?: string[] | TClinicalDrug[];
  onSubmit: (cliDrug?: object) => void;
}

export const ClinicalDrugFilter: FC<ClinicalDrugFilterProps> = ({ initialValue, onSubmit }) => {
  const [clinicalDrug, setClinicalDrug] = useState<TClinicalDrug[]>([]);

  const handleChange = (value: TClinicalDrug[]) => {
    setClinicalDrug(value);
  };

  useEffect(() => {
    setClinicalDrug(initialValue as TClinicalDrug[] ?? []);
  }, [initialValue]);

  return (
    <SearchFilter defaultOpen={!!clinicalDrug.length} name="Clinical Drug">
      <ClinicalDrug value={clinicalDrug} onChange={handleChange} direction="vertical" />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(clinicalDrug ?? [])}>
        Apply
      </Button>
    </SearchFilter>
  );
};
