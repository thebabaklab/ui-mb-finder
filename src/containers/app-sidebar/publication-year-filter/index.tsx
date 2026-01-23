import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

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
        <label className="text-platinum-silver cursor-pointer text-base font-light select-none">Range:</label>

        <div className="flex flex-col items-center gap-4">
          <TextField
            value={startYear}
            name="startYear"
            placeholder=""
            type="number"
            full_p={true}
            bg_color="bg-gunmetal"
            className="text-platinum-silver"
            hideDetails
            dense
            onChange={handleChange}
            />

          <TextField
            value={endYear}
            name="endYear"
            placeholder=""
            type="number"
            full_p={true}
            bg_color="bg-gunmetal"
            className="text-platinum-silver"
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
