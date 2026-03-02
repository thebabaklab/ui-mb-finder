import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface Ic50RangeFilterProps {
  initialIcStart?: number;
  initialIcEnd?: number;
  onSubmit: (icStart?: number, icEnd?: number) => void;
}

export const Ic50RangeFilter: FC<Ic50RangeFilterProps> = ({ initialIcStart, initialIcEnd, onSubmit }) => {
  const [startIC50, setStartIC50] = useState(String(initialIcStart ?? ""));
  const [endIC50, setEndIC50] = useState(String(initialIcEnd ?? ""));

  useEffect(() => {
    setStartIC50(String(initialIcStart ?? ""));
    setEndIC50(String(initialIcEnd ?? ""));
  }, [initialIcStart, initialIcEnd]);

  return (
    <SearchFilter
      name={
        <span>
          IC<span className="align-sub text-xs">50</span> μM
        </span>
      }
    >
      <div className="flex flex-col gap-2">
        <label className="text-platinum-silver cursor-pointer text-base font-light select-none">Range:</label>

        <div className="flex flex-col items-center gap-4">
          <TextField
            value={startIC50}
            name="startIC50"
            className="text-platinum-silver"
            placeholder=""
            full_p={true}
            bg_color="bg-gunmetal"
            type="number"
            hideDetails
            dense
            onChange={e => setStartIC50(e.target.value)}
          />

          <TextField
            value={endIC50}
            name="endIC50"
            className="text-platinum-silver"
            placeholder=""
            full_p={true}
            bg_color="bg-gunmetal"
            type="number"
            hideDetails
            dense
            onChange={e => setEndIC50(e.target.value)}
          />
        </div>
      </div>

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(startIC50 ? Number(startIC50) : undefined, endIC50 ? Number(endIC50) : undefined)}>
        Apply
      </Button>
    </SearchFilter>
  );
};
