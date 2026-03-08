import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface PublicationYearFilterProps {
  start_initialValue?: number;
  end_initialValue?: number;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (value: {
    pyearStart?: number;
    pyearEnd?: number;
  }) => void;
}

export const PublicationYearFilter: FC<PublicationYearFilterProps> = ({ start_initialValue, end_initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="Publication Year">
      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}

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
                pyearEnd: end_initialValue,
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
                pyearStart: start_initialValue,
                pyearEnd: e.target.value
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
