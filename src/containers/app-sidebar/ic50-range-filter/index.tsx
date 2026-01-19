import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { mdiMinus } from "@mdi/js";
import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, Icon, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface Ic50RangeFilterProps {
  onSubmit: () => void;
}

export const Ic50RangeFilter: FC<Ic50RangeFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [startIC50, setStartIC50] = useState("");
  const [endIC50, setEndIC50] = useState("");

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const ic50Range = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.IC50Range);
    const newFilters: TFilterItem[] = search.filters.filter((f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.IC50Range);
    const newFilterValue = {
      startIC50: name === "startIC50" ? value : ic50Range?.filterValue.startIC50,
      endIC50: name === "endIC50" ? value : ic50Range?.filterValue.endIC50,
    };

    if (newFilterValue.startIC50 || newFilterValue.endIC50) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.IC50Range,
        filterValue: newFilterValue,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedIc50Range = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.IC50Range);
    if (searchedIc50Range) {
      const { startIC50, endIC50 } = searchedIc50Range.filterValue;
      if (typeof startIC50 !== "undefined") setStartIC50(startIC50);
      if (typeof endIC50 !== "undefined") setEndIC50(endIC50);
    } else {
      setStartIC50("");
      setEndIC50("");
    }
  }, [search.filters]);

  return (
    <SearchFilter
      name={
        <span>
          IC<span className="align-sub text-xs">50</span> μM
        </span>
      }
    >
      <div className="flex flex-col gap-2">
        <label className="text-foreground-muted cursor-pointer text-sm font-semibold select-none">Range:</label>

        <div className="flex items-center gap-1">
          <TextField
            value={startIC50}
            name="startIC50"
            placeholder="From"
            type="number"
            hideDetails
            dense
            onChange={handleChange}
          />

          <Icon name={mdiMinus} small />

          <TextField
            value={endIC50}
            name="endIC50"
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
