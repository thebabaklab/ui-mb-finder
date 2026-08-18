import { type FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface CellLineFilterProps {
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (cellLine?: string) => void;
}

export const CellLineFilter: FC<CellLineFilterProps> = ({ negate, onNegateChange, initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="Cell Line">
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={initialValue ?? ""} placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />

      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}
    </SearchFilter>
  );
};
