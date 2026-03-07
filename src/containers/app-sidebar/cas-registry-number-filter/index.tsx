import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface CasRegistryNumberFilterProps {
  initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (cas?: string) => void;
}

export const CasRegistryNumberFilter: FC<CasRegistryNumberFilterProps> = ({ initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="CAS Registry Number">
      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}

      <TextField
        value={initialValue ?? ""}
        placeholder=""
        className="text-platinum-silver"
        full_p={true}
        bg_color="bg-gunmetal"
        hideDetails
        dense
        onChange={e => onChange(e.target.value || undefined)}
      />
    </SearchFilter>
  );
};
