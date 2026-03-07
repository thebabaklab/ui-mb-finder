import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface SmilesFilterFilterProps {
  initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (smiles?: string) => void;
}

export const SmilesFilter: FC<SmilesFilterFilterProps> = ({ initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="SMILES">
      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}

      <TextField className="text-platinum-silver" value={initialValue ?? ""} full_p={true} bg_color="bg-gunmetal" placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />
    </SearchFilter>
  );
};
