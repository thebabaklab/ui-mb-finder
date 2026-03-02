import { type FC } from "react";
import { ClinicalDrug } from "../../advanced-search-field/clinical-drug";
import { SearchFilter } from "../../search-filter";

interface ClinicalDrugFilterProps {
  initialValue: string[];
  onChange: (cliDrug?: string[]) => void;
}

export const ClinicalDrugFilter: FC<ClinicalDrugFilterProps> = ({ initialValue, onChange }) => {
  return (
    <SearchFilter defaultOpen={!!initialValue.length} name="Clinical Drug">
      <ClinicalDrug value={initialValue} onChange={onChange} direction="vertical" />
    </SearchFilter>
  );
};
