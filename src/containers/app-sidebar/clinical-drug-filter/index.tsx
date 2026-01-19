import { type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TClinicalDrug, type TFilterItem } from "@types";
import { Button } from "@ui-kit";

import { ClinicalDrug } from "../../advanced-search-field/clinical-drug";
import { SearchFilter } from "../../search-filter";

interface ClinicalDrugFilterProps {
  onSubmit: () => void;
}

export const ClinicalDrugFilter: FC<ClinicalDrugFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [clinicalDrug, setClinicalDrug] = useState<TClinicalDrug[]>([]);

  const handleChange = (value: TClinicalDrug[]) => {
    const newFilters: TFilterItem[] = search.filters.filter(
      (f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.ClinicalDrug
    );

    if (value.length) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug,
        filterValue: value,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedClinicalDrug = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug);
    if (searchedClinicalDrug) {
      setClinicalDrug(searchedClinicalDrug.filterValue);
    } else {
      setClinicalDrug([]);
    }
  }, [search.filters]);

  return (
    <SearchFilter defaultOpen={!!clinicalDrug.length} name="Clinical Drug">
      <ClinicalDrug value={clinicalDrug} onChange={handleChange} direction="vertical" />

      <Button size="small" onClick={onSubmit}>
        Apply
      </Button>
    </SearchFilter>
  );
};
