import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface MolecularWeightFilterProps {
  initialweightStart?: number;
  initialweightEnd?: number;
  onChange: (value: {
    weightStart?: number;
    weightEnd?: number;
  }) => void;
}

export const MolecularWeightFilter: FC<MolecularWeightFilterProps> = ({ initialweightStart, initialweightEnd, onChange }) => {
  return (
    <SearchFilter defaultOpen={!!initialweightStart || !!initialweightEnd} name="Molecular Weight">
      <div className="flex flex-col gap-2">
        <label className="text-platinum-silver cursor-pointer text-base font-light select-none">Range:</label>

        <div className="flex flex-col items-center gap-4">
          <TextField
            value={initialweightStart}
            name="startWeight"
            placeholder=""
            className="text-platinum-silver"
            bg_color="bg-gunmetal"
            full_p={true}
            type="number"
            hideDetails
            dense
            onChange={e => onChange({
              weightEnd: initialweightEnd,
              weightStart: e.target.value
                ? Number(e.target.value)
                : undefined,
            })}
          />

          <TextField
            value={initialweightEnd}
            name="endWeight"
            placeholder=""
            className="text-platinum-silver"
            bg_color="bg-gunmetal"
            full_p={true}
            type="number"
            hideDetails
            dense
            onChange={e => onChange({
              weightStart: initialweightStart,
              weightEnd: e.target.value
                ? Number(e.target.value)
                : undefined,
            })}
          />
        </div>
      </div>
    </SearchFilter>
  );
};
