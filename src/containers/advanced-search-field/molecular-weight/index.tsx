import type { FC } from "react";
import { TextField } from "@ui-kit";
import { LogicalOperatorSelect } from "../logical-operator-select";

interface MolecularWeightProps {
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  startWeight: string;
  endWeight: string;
  onChange: (value: string, prop: "weightStart" | "weightEnd") => void;
}

export const MolecularWeight: FC<MolecularWeightProps> = ({
  logicalOperator,
  onLogicalOperatorChange,
  startWeight,
  endWeight,
  onChange,
}) => {
  return (
    <div className="flex gap-5 md:gap-22 justify-between lg:grow">
      {/* <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} /> */}

      <div className="flex gap-5">
        <div className="hidden items-center sm:flex font-light text-platinum-silver">Range:</div>

        <div className="flex items-center gap-5 md:gap-10">
          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={startWeight}
              type="number"
              hideDetails
              placeholder="From:"
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                  From:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "weightStart")}
            />
          </div>

          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={endWeight}
              type="number"
              hideDetails
              placeholder="To:"
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                  To:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "weightEnd")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
