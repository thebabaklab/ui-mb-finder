import type { FC } from "react";
import { TextField } from "@ui-kit";
import { LogicalOperatorSelect } from "../logical-operator-select";
import { cn } from "@utils";

interface IC50RangeProps {
  lastIndex: boolean;
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  icStart: string;
  icEnd: string;
  onChange: (value: string, prop: "icStart" | "icEnd") => void;
}

export const IC50Range: FC<IC50RangeProps> = ({
  lastIndex,
  logicalOperator,
  onLogicalOperatorChange,
  icStart,
  icEnd,
  onChange,
}) => {
  return (
    <div className={cn("flex gap-5 md:gap-22 justify-between lg:grow", !lastIndex ? "justify-between" : "justify-end")}>
      {!lastIndex && (
        <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />
      )}

      <div className="flex gap-5">
        <div className="hidden items-center sm:flex font-light text-platinum-silver">Range:</div>

        <div className="flex items-center gap-5 md:gap-10">
          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={icStart}
              type="number"
              hideDetails
              placeholder="From:"
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                  From:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "icStart")}
            />
          </div>

          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={icEnd}
              type="number"
              hideDetails
              placeholder="To:"
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                  To:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "icEnd")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
