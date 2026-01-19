import type { FC } from "react";

import { ENUM_LOGICAL_OPERATOR } from "@types";
import { Select } from "@ui-kit";

import { logicalOperators } from "../advanced-search-field.consts";

interface LogicalOperatorProps {
  value?: string;
  onChange: (value: string) => void;
}

export const LogicalOperatorSelect: FC<LogicalOperatorProps> = ({ value, onChange }) => {
  const handleChange = (value: string) => {
    onChange(value === ENUM_LOGICAL_OPERATOR.NoValue ? "" : value);
  };

  return (
    <div className="w-[100px] min-w-[100px]">
      <Select value={value} items={logicalOperators} onValueChange={handleChange} hideDetails />
    </div>
  );
};
