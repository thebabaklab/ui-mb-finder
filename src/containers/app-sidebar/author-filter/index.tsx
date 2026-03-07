import { type FC } from "react";
import { TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";
import { LogicalOperatorSelect } from "../../advanced-search-field/logical-operator-select";

interface AuthorFilterProps {
  initialValue?: string;
  logicalOperator?: string;
  onLogicalOperatorChange?: (value: string) => void;
  onChange: (author?: string) => void;
}

export const AuthorFilter: FC<AuthorFilterProps> = ({ initialValue, logicalOperator, onLogicalOperatorChange, onChange }) => {
  return ( 
    <SearchFilter defaultOpen={!!initialValue} name="Authors">
      <LogicalOperatorSelect parent="sidebar" value={logicalOperator ?? ""} onChange={onLogicalOperatorChange} />

      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={initialValue ?? ""} placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />
    </SearchFilter>
  );
};
