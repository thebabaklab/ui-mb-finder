import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface CasRegistryNumberFilterProps {
  onSubmit: () => void;
}

export const CasRegistryNumberFilter: FC<CasRegistryNumberFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [casRegistryNumber, setCasRegistryNumber] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilters: TFilterItem[] = search.filters.filter(
      (f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber
    );

    if (e.target.value) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber,
        filterValue: e.target.value,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedCasRegistryNumber = search.filters.find(
      (f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber
    );
    if (searchedCasRegistryNumber) {
      setCasRegistryNumber(searchedCasRegistryNumber.filterValue);
    } else {
      setCasRegistryNumber("");
    }
  }, [search.filters]);

  return (
    <SearchFilter defaultOpen={!!casRegistryNumber} name="CAS Registry Number">
      <TextField
        value={casRegistryNumber}
        placeholder="Enter a CAS Number..."
        hideDetails
        dense
        onChange={handleChange}
      />

      <Button size="small" onClick={onSubmit}>
        Search
      </Button>
    </SearchFilter>
  );
};
