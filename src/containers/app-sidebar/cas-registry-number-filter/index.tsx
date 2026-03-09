import { type FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface CasRegistryNumberFilterProps {
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  initialValue?: string;
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (cas?: string) => void;
}

export const CasRegistryNumberFilter: FC<CasRegistryNumberFilterProps> = ({ negate, onNegateChange, initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="CAS Registry Number">
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

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

      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}
    </SearchFilter>
  );
};
