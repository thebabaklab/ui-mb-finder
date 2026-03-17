import { type FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface PublicationYearFilterProps {
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  start_initialValue?: string;
  end_initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (value: {
    pyearStart?: number;
    pyearEnd?: number;
  }) => void;
}

export const PublicationYearFilter: FC<PublicationYearFilterProps> = ({ negate, onNegateChange, start_initialValue, end_initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="Publication Year">
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

      <div className="flex flex-col gap-2">
        <label className="text-platinum-silver cursor-pointer text-base font-light select-none">Range:</label>

        <div className="flex flex-col items-center gap-4">
          <TextField
            value={start_initialValue}
            name="startYear"
            placeholder=""
            type="number"
            full_p={true}
            bg_color="bg-gunmetal"
            className="text-platinum-silver"
            hideDetails
            dense 
            onChange={(e) =>
              onChange({
                pyearEnd: Number(end_initialValue),
                pyearStart: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
          />

          <TextField
            value={end_initialValue}
            name="endYear"
            placeholder=""
            type="number"
            full_p={true}
            bg_color="bg-gunmetal"
            className="text-platinum-silver"
            hideDetails
            dense
            onChange={(e) =>
              onChange({
                pyearStart: Number(start_initialValue),
                pyearEnd: e.target.value
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
