import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { mdiMinus } from "@mdi/js";
import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, Icon, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface MolecularWeightFilterProps {
  onSubmit: () => void;
}

export const MolecularWeightFilter: FC<MolecularWeightFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [startWeight, setStartWeight] = useState("");
  const [endWeight, setEndWeight] = useState("");

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const molecularWeight = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.MolecularWeight);
    const newFilters: TFilterItem[] = search.filters.filter(
      (f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.MolecularWeight
    );
    const newFilterValue = {
      startWeight: name === "startWeight" ? value : molecularWeight?.filterValue.startWeight,
      endWeight: name === "endWeight" ? value : molecularWeight?.filterValue.endWeight,
    };

    if (newFilterValue.startWeight || newFilterValue.endWeight) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.MolecularWeight,
        filterValue: newFilterValue,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedMolecularWeight = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.MolecularWeight);
    if (searchedMolecularWeight) {
      const { startWeight, endWeight } = searchedMolecularWeight.filterValue;
      if (typeof startWeight !== "undefined") setStartWeight(startWeight);
      if (typeof endWeight !== "undefined") setEndWeight(endWeight);
    } else {
      setStartWeight("");
      setEndWeight("");
    }
  }, [search.filters]);

  return (
    <SearchFilter defaultOpen={!!startWeight || !!endWeight} name="Molecular Weight">
      <div className="flex flex-col gap-2">
        <label className="text-foreground-muted cursor-pointer text-sm font-semibold select-none">Range:</label>

        <div className="flex items-center gap-1">
          <TextField
            value={startWeight}
            name="startWeight"
            placeholder="From"
            type="number"
            hideDetails
            dense
            onChange={handleChange}
          />

          <Icon name={mdiMinus} small />

          <TextField
            value={endWeight}
            name="endWeight"
            placeholder="To"
            type="number"
            hideDetails
            dense
            onChange={handleChange}
          />
        </div>
      </div>

      <Button size="small" onClick={onSubmit}>
        Apply
      </Button>
    </SearchFilter>
  );
};
