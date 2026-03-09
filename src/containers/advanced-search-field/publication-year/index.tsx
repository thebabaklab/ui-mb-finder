import type { FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { LogicalOperatorSelect } from "../logical-operator-select";
import { cn } from "@utils";

interface PublicationYearProps {
  lastIndex: boolean;
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  pyearStart: string;
  pyearEnd: string;
  onChange: (value: string, prop: "pyearStart" | "pyearEnd") => void;
}

export const PublicationYear: FC<PublicationYearProps> = ({
  lastIndex,
  negate,
  onNegateChange,
  logicalOperator,
  onLogicalOperatorChange,
  pyearStart,
  pyearEnd,
  onChange,
}) => {
  return (
    <div className={cn("flex gap-5 md:gap-22 justify-between lg:grow")}>
      <Checkbox label="NOT" className="mr-auto" checked={negate} onCheckedChange={onNegateChange} />

      <div className="flex gap-5">
        <div className="hidden items-center sm:flex font-light text-platinum-silver">Range:</div>

        <div className="flex items-center gap-5 md:gap-10">
          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={pyearStart}
              type="number"
              hideDetails
              placeholder="From:"
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                  From:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "pyearStart")}
            />
          </div>

          <div className="w-[calc(50%_-_0.25rem)]">
            <TextField
              value={pyearEnd}
              type="number"
              hideDetails
              placeholder="To:"
              full_p={true}
              prependInner={
                <div className="text-gunmetal font-light mr-3 hidden items-center gap-3 text-sm whitespace-nowrap">
                  To:
                </div>
              }
              onChange={(e) => onChange(e.target.value, "pyearEnd")}
            />
          </div>
        </div>
      </div>

      {!lastIndex && (
        <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />
      )}
    </div>
  );
};
