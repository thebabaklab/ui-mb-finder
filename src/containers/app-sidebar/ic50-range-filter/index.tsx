import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface Ic50RangeFilterProps {
  initialIcStart?: number;
  initialIcEnd?: number;
  logicalOperator?: string;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (value: {
    icStart?: number;
    icEnd?: number;
  }) => void;
}

export const Ic50RangeFilter: FC<Ic50RangeFilterProps> = ({ initialIcStart, initialIcEnd, logicalOperator, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter
      defaultOpen={!!initialIcStart || !!initialIcEnd}
      name={
        <span>
          IC<span className="align-sub text-xs">50</span> μM
        </span>
      }
    >
      <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />

      <div className="flex flex-col gap-2">
        <label className="text-platinum-silver cursor-pointer text-base font-light select-none">Range:</label>

        <div className="flex flex-col items-center gap-4">
          <TextField
            value={initialIcStart}
            name="startIC50"
            className="text-platinum-silver"
            placeholder=""
            full_p={true}
            bg_color="bg-gunmetal"
            type="number"
            hideDetails
            dense
            onChange={e =>
              onChange({
                icEnd: initialIcEnd,
                icStart: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })}
          />

          <TextField
            value={initialIcEnd}
            name="endIC50"
            className="text-platinum-silver"
            placeholder=""
            full_p={true}
            bg_color="bg-gunmetal"
            type="number"
            hideDetails
            dense
            onChange={e =>
              onChange({
                icStart: initialIcStart,
                icEnd: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
          />
        </div>
      </div>
    </SearchFilter>
  );
};
