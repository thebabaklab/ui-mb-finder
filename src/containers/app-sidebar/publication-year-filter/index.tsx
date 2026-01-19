import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { mdiMinus } from "@mdi/js";
import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, Icon, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface PublicationYearFilterProps {
  onSubmit: () => void;
}

export const PublicationYearFilter: FC<PublicationYearFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const publicationYear = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.PublicationYear);
    const newFilters: TFilterItem[] = search.filters.filter(
      (f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.PublicationYear
    );
    const newFilterValue = {
      startYear: name === "startYear" ? value : publicationYear?.filterValue.startYear,
      endYear: name === "endYear" ? value : publicationYear?.filterValue.endYear,
    };

    if (newFilterValue.startYear || newFilterValue.endYear) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.PublicationYear,
        filterValue: newFilterValue,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedPublicationYear = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.PublicationYear);
    if (searchedPublicationYear) {
      const { startYear, endYear } = searchedPublicationYear.filterValue;
      if (typeof startYear !== "undefined") setStartYear(startYear);
      if (typeof endYear !== "undefined") setEndYear(endYear);
    } else {
      setStartYear("");
      setEndYear("");
    }
  }, [search.filters]);

  return (
    <SearchFilter name="Publication Year">
      <div className="flex flex-col gap-2">
        <label className="text-foreground-muted cursor-pointer text-sm font-semibold select-none">Range:</label>

        <div className="flex items-center gap-1">
          <TextField
            value={startYear}
            name="startYear"
            placeholder="From"
            type="number"
            hideDetails
            dense
            onChange={handleChange}
          />

          <Icon name={mdiMinus} small />

          <TextField
            value={endYear}
            name="endYear"
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
