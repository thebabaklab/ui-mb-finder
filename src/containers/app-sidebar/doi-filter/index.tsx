import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface DoiFilterProps {
  initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (doi?: string) => void;
}

export const DoiFilter: FC<DoiFilterProps> = ({ initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="DOI">
      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}

      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={initialValue ?? ""} placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />
    </SearchFilter>
  );
};
