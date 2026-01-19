import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface SmilesFilterFilterProps {
  onSubmit: () => void;
}

export const SmilesFilter: FC<SmilesFilterFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [smiles, setSmiles] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilters: TFilterItem[] = search.filters.filter((f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.Smiles);

    if (e.target.value) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.Smiles,
        filterValue: e.target.value,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedSmiles = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.Smiles);
    if (searchedSmiles) {
      setSmiles(searchedSmiles.filterValue);
    } else {
      setSmiles("");
    }
  }, [search.filters]);

  return (
    <SearchFilter defaultOpen={!!smiles} name="SMILES">
      <TextField value={smiles} placeholder="Type SMILES..." hideDetails dense onChange={handleChange} />

      <Button size="small" onClick={onSubmit}>
        Search
      </Button>
    </SearchFilter>
  );
};
