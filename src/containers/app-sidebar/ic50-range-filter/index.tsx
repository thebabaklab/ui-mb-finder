import { type FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface Ic50RangeFilterProps {
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  initialIcStart?: number;
  initialIcEnd?: number;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (value: {
    icStart?: number;
    icEnd?: number;
  }) => void;
}

export const Ic50RangeFilter: FC<Ic50RangeFilterProps> = ({ negate, onNegateChange, initialIcStart, initialIcEnd, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter
      defaultOpen={true}
      onRemove={onRemove}
      name={
        <span>
          IC<span className="align-sub text-xs">50</span> μM
        </span>
      }
    >
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

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

      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}
    </SearchFilter>
  );
};
