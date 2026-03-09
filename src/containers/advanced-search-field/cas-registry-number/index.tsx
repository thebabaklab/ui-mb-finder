import type { FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { LogicalOperatorSelect } from "../logical-operator-select";

interface CasRegistryNumberProps {
  lastIndex: boolean;
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export const CasRegistryNumber: FC<CasRegistryNumberProps> = ({
  lastIndex,
  negate,
  onNegateChange,
  logicalOperator,
  onLogicalOperatorChange,
  value,
  onChange,
}) => {
  return (
    <div className="flex grow gap-5">
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

      <div className="grow">
        <TextField
          value={value}
          placeholder="CAS Registry Number:"
          hideDetails
          full_p={true}
          prependInner={
            <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
              CAS Registry Number:
            </div>
          }
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {!lastIndex && (
        <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />
      )}
    </div>
  );
};
