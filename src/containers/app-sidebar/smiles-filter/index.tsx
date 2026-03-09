import { type FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface SmilesFilterFilterProps {
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (smiles?: string) => void;
}

export const SmilesFilter: FC<SmilesFilterFilterProps> = ({ negate, onNegateChange, initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="SMILES">
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

      <TextField className="text-platinum-silver" value={initialValue ?? ""} full_p={true} bg_color="bg-gunmetal" placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />

      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}
    </SearchFilter>
  );
};
