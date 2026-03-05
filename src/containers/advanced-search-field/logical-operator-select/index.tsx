import type { FC } from "react";
import { Select } from "@ui-kit";
import { logicalOperators } from "../advanced-search-field.consts";

interface LogicalOperatorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const LogicalOperatorSelect: FC<LogicalOperatorProps> = ({ value, onChange }) => {
  const handleChange = (value: string) => {
    if (onChange)
      onChange(value);
  };

  return (
    <div className="w-[100px] min-w-[100px]">
      <Select value={value} items={logicalOperators} placeholder="LOGIC" onValueChange={handleChange} hideDetails />
    </div>
  );
};
