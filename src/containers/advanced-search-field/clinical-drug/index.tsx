import type { FC } from "react";
import { Checkbox } from "@ui-kit";
import { cn } from "@utils";
import { LogicalOperatorSelect } from "../logical-operator-select";

interface ClinicalDrugProps {
  lastIndex: boolean;
  negate: boolean;
  onNegateChange: (value: boolean) => void;
  value: string[];
  onChange: (value: string[]) => void;
  direction?: "horizontal" | "vertical";
  logicalOperator?: string;
  onLogicalOperatorChange?: (value: string) => void;
}

export const ClinicalDrug: FC<ClinicalDrugProps> = ({ lastIndex, negate, onNegateChange, value, onChange, direction = "horizontal", logicalOperator, onLogicalOperatorChange }) => {
  return (
    <div className="flex grow gap-5 md:gap-12 items-center justify-between">
      <Checkbox label="NOT" checked={negate} onCheckedChange={onNegateChange} />

      <div className={cn("flex justify-between", direction === "vertical" ? "flex-col gap-3" : "gap-3 md:gap-[33px]", !lastIndex ? "" : "grow")}>
        <div className={cn(direction === "horizontal" && "w-1/3 sm:w-auto")}>
          <Checkbox
            reversed={true}
            label="Cisplatin"
            justifyType="justify-between"
            checked={value.includes("Cisplatin")}
            onCheckedChange={(checked) =>
              onChange(checked ? [...value, "Cisplatin"] : value.filter((s) => s !== "Cisplatin"))
            }
          />
        </div>

        <div className={cn(direction === "horizontal" && "w-1/3 sm:w-auto")}>
          <Checkbox
            reversed={true}
            label="Carboplatin"
            justifyType="justify-between"
            checked={value.includes("Carboplatin")}
            onCheckedChange={(checked) =>
              onChange(checked ? [...value, "Carboplatin"] : value.filter((s) => s !== "Carboplatin"))
            }
          />
        </div>

        <div className={cn(direction === "horizontal" && "w-1/3 sm:w-auto")}>
          <Checkbox
            reversed={true}
            label="Oxaliplatin"
            justifyType="justify-between"
            checked={value.includes("Oxaliplatin")}
            onCheckedChange={(checked) =>
              onChange(checked ? [...value, "Oxaliplatin"] : value.filter((s) => s !== "Oxaliplatin"))
            }
          />
        </div>

        <div className={cn(direction === "horizontal" && "w-1/3 sm:w-auto")}>
          <Checkbox
            reversed={true}
            label="Transplantin"
            justifyType="justify-between"
            checked={value.includes("Transplantin")}
            onCheckedChange={(checked) =>
              onChange(checked ? [...value, "Transplantin"] : value.filter((s) => s !== "Transplantin"))
            }
          />
        </div>
      </div>

      {!lastIndex && (
        <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />
      )}
    </div>
  );
};
