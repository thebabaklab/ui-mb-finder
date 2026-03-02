import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface MolecularWeightFilterProps {
  initialweightStart?: number;
  initialweightEnd?: number;
  onSubmit: (weightStart?: number, weightEnd?: number) => void;
}

export const MolecularWeightFilter: FC<MolecularWeightFilterProps> = ({ initialweightStart, initialweightEnd, onSubmit }) => {
  const [startWeight, setStartWeight] = useState(String(initialweightStart ?? ""));
  const [endWeight, setEndWeight] = useState(String(initialweightEnd ?? ""));

  useEffect(() => {
    setStartWeight(String(initialweightStart ?? ""));
    setEndWeight(String(initialweightEnd ?? ""));
  }, [initialweightStart, initialweightEnd]);

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
            onChange={e => setStartWeight(e.target.value)}
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
            onChange={e => setEndWeight(e.target.value)}
          />
        </div>
      </div>

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(startWeight ? Number(startWeight) : undefined, endWeight ? Number(endWeight) : undefined)}>
        Apply
      </Button>
    </SearchFilter>
  );
};
