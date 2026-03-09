import { type FC } from "react";
import { ClinicalDrug } from "../../advanced-search-field/clinical-drug";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface ClinicalDrugFilterProps {
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  initialValue: string[];
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (cliDrug?: string[]) => void;
}

export const ClinicalDrugFilter: FC<ClinicalDrugFilterProps> = ({ negate, onNegateChange, initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="Clinical Drug">
      <ClinicalDrug negate={negate} onNegateChange={onNegateChange} lastIndex={true} value={initialValue} onChange={onChange} direction="vertical" />

      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}
    </SearchFilter>
  );
};
