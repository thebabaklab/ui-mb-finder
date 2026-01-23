import type { FC } from "react";

import type { TClinicalDrug } from "@types";
import { Checkbox } from "@ui-kit";
import { cn } from "@utils";

interface ClinicalDrugProps {
  value: TClinicalDrug[];
  onChange: (value: TClinicalDrug[]) => void;
  direction?: "horizontal" | "vertical";
}

export const ClinicalDrug: FC<ClinicalDrugProps> = ({ value, onChange, direction = "horizontal" }) => {
  return (
    <div className={cn("flex", direction === "vertical" ? "flex-col gap-3" : "gap-3 md:gap-[33px]")}>
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
    </div>
  );
};
