import { type FC } from "react";
import { ClinicalDrug } from "../../advanced-search-field/clinical-drug";
import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface ClinicalDrugFilterProps {
  initialValue: string[];
  hasLogicOperator?: boolean;
  logicalOperator?: string;
  onRemove?: () => void;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (cliDrug?: string[]) => void;
}

export const ClinicalDrugFilter: FC<ClinicalDrugFilterProps> = ({ initialValue, hasLogicOperator, logicalOperator, onRemove, onLogicalOperatorChange, onChange }) => {
  return (
    <SearchFilter defaultOpen={true} onRemove={onRemove} name="Clinical Drug">
      {hasLogicOperator && (
        <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />
      )}

      <ClinicalDrug lastIndex={true} value={initialValue} onChange={onChange} direction="vertical" />
    </SearchFilter>
  );
};
