import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

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
    if (name === "startWeight")
      setStartWeight(value);
    else
      setEndWeight(value);
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
        <label className="text-platinum-silver cursor-pointer text-base font-light select-none">Range:</label>

        <div className="flex flex-col items-center gap-4">
          <TextField
            value={startWeight}
            name="startWeight"
            placeholder=""
            className="text-platinum-silver"
            bg_color="bg-gunmetal"
            full_p={true}
            type="number"
            hideDetails
            dense
            onChange={handleChange}
          />

          <TextField
            value={endWeight}
            name="endWeight"
            placeholder=""
            className="text-platinum-silver"
            bg_color="bg-gunmetal"
            full_p={true}
            type="number"
            hideDetails
            dense
            onChange={handleChange}
          />
        </div>
      </div>

      <Button variant={"back"} className="font-light text-base" size="small" onClick={onSubmit}>
        Apply
      </Button>
    </SearchFilter>
  );
};
