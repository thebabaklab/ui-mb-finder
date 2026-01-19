import type { FC } from "react";

import { TextField } from "@ui-kit";

import { LogicalOperatorSelect } from "../logical-operator-select";

interface CasRegistryNumberProps {
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export const CasRegistryNumber: FC<CasRegistryNumberProps> = ({
  logicalOperator,
  onLogicalOperatorChange,
  value,
  onChange,
}) => {
  return (
    <div className="flex grow gap-5">
      <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />

      <div className="grow">
        <TextField
          value={value}
          placeholder=""
          hideDetails
          full_p={true}
          prependInner={
            <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap sm:flex">
              CAS Registry Number:
              {/* <div className="bg-foreground h-4 w-[1px]"></div> */}
            </div>
          }
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
