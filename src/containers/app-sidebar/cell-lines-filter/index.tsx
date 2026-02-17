import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface CellLinesFilterProps {
  onSubmit: () => void;
}

export const CellLinesFilter: FC<CellLinesFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [cellLines, setCellLines] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilters: TFilterItem[] = search.filters.filter((f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.CellLines);

    if (e.target.value) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.CellLines,
        filterValue: e.target.value,
      });
    }

    setSearch({ ...search, filters: newFilters });
    setCellLines(e.target.value);
  };

  useEffect(() => {
    const searchedCellLines = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.CellLines);
    if (searchedCellLines) {
      setCellLines(searchedCellLines.filterValue);
    } else {
      setCellLines("");
    }
  }, [search.filters]);

  return (
    <SearchFilter name="Cell Lines">
      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={cellLines} placeholder="" hideDetails dense onChange={handleChange} />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={onSubmit}>
        Search
      </Button>
    </SearchFilter>
  );
};
