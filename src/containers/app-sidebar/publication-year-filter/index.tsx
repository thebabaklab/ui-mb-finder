import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface PublicationYearFilterProps {
  start_initialValue?: number,
  end_initialValue?: number,
  onSubmit: (value_years: object) => void;
}

export const PublicationYearFilter: FC<PublicationYearFilterProps> = ({ start_initialValue, end_initialValue, onSubmit }) => {
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  useEffect(() => {
    setStartYear(start_initialValue ?? 0);
    setEndYear(end_initialValue ?? 0);
  }, [start_initialValue, end_initialValue]);

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
            onChange={e => setStartYear(Number(e.target.value))}
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
            onChange={e => setEndYear(Number(e.target.value))}
          />
        </div>
      </div>

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => {
        const filters: Partial<{
          pyearStart: number;
          pyearEnd: number;
        }> = {}

        if (startYear)
          filters.pyearStart = startYear;
        if (endYear)
          filters.pyearEnd = endYear;

        onSubmit(filters)

      }}>
        Apply
      </Button>
    </SearchFilter>
  );
};
