import type { FC } from "react";

// import { mdiMinus } from "@mdi/js";
import { TextField } from "@ui-kit";

import { LogicalOperatorSelect } from "../logical-operator-select";

interface MolecularWeightProps {
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  startWeight: string;
  endWeight: string;
  onChange: (value: string, prop: "startWeight" | "endWeight") => void;
}

export const MolecularWeight: FC<MolecularWeightProps> = ({
  logicalOperator,
  onLogicalOperatorChange,
  startWeight,
  endWeight,
  onChange,
}) => {
  return (
    <div className="flex gap-22 justify-between lg:grow">
      <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />

      <div className="flex gap-5">
        <div className="hidden items-center sm:flex font-light text-platinum-silver">Range:</div>

        <div className="flex items-center gap-10">
          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={startWeight}
              type="number"
              hideDetails
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap sm:flex">
                  From:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "startWeight")}
            />
          </div>

          {/* <Icon name={mdiMinus} dense /> */}

          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={endWeight}
              type="number"
              hideDetails
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap sm:flex">
                  To:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "endWeight")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
