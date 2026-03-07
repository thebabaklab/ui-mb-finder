import type { FC } from "react";
import { Select } from "@ui-kit";
import { logicalOperators } from "../advanced-search-field.consts";
import { cn } from "@utils";

interface LogicalOperatorProps {
  value?: string;
  onChange?: (value: string) => void;
  parent?: string;
}

export const LogicalOperatorSelect: FC<LogicalOperatorProps> = ({ value, onChange, parent }) => {
  const handleChange = (value: string) => {
    if (onChange)
      onChange(value);
  };

  return (
    <div className={cn(parent === 'sidebar' ? "w-full" : "w-[100px] min-w-[100px]")}>
      <Select value={value} items={logicalOperators} placeholder="LOGIC" onValueChange={handleChange} hideDetails />
    </div>
  );
};
