import type { FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { LogicalOperatorSelect } from "../logical-operator-select";

interface IncubationTimeProps {
  lastIndex: boolean;
  logicalOperator: string;
  onLogicalOperatorChange: (value: string) => void;
  value: ("all" | number)[];
  onChange: (value: ("all" | number)[]) => void;
  otherValue: string;
  onOtherValueChange: (value: string) => void;
}

export const IncubationTime: FC<IncubationTimeProps> = ({
  lastIndex,
  logicalOperator,
  onLogicalOperatorChange,
  value,
  onChange,
  otherValue,
  onOtherValueChange,
}) => {
  return (
    <div className="flex grow flex-col justify-between gap-5 md:flex-row md:items-center">
      <div className="flex gap-5">
        {!lastIndex && (
          <LogicalOperatorSelect value={logicalOperator} onChange={onLogicalOperatorChange} />
        )}
        
        <div className="grow md:hidden">
          <TextField
            value={otherValue}
            placeholder="Other Value"
            type="number"
            hideDetails
            full_p={true}
            onChange={(e) => onOtherValueChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row md:gap-6">
        <div className="flex grow gap-5 sm:gap-0 md:items-center md:gap-6">
          <div className="w-[100px] sm:w-1/3">
            <Checkbox
              label="All"
              checked={[24, 48, 72, 96, 120].every((n) => value.includes(n))}
              onCheckedChange={(checked) => onChange(checked ? ["all", 24, 48, 72, 96, 120] : [])}
            />
          </div>

          <div className="w-[100px] sm:w-1/3 md:w-auto">
            <Checkbox
              label="24"
              checked={value.includes(24)}
              onCheckedChange={(checked) => onChange(checked ? [...value, 24] : value.filter((n) => n !== 24))}
            />
          </div>

          <div className="w-[100px] sm:w-1/3 md:w-auto">
            <Checkbox
              label="48"
              checked={value.includes(48)}
              onCheckedChange={(checked) => onChange(checked ? [...value, 48] : value.filter((n) => n !== 48))}
            />
          </div>
        </div>

        <div className="flex grow gap-5 sm:gap-0 md:items-center md:gap-6">
          <div className="w-[100px] sm:w-1/3 md:w-auto">
            <Checkbox
              label="72"
              checked={value.includes(72)}
              onCheckedChange={(checked) => onChange(checked ? [...value, 72] : value.filter((n) => n !== 72))}
            />
          </div>

          <div className="w-[100px] sm:w-1/3 md:w-auto">
            <Checkbox
              label="96"
              checked={value.includes(96)}
              onCheckedChange={(checked) => onChange(checked ? [...value, 96] : value.filter((n) => n !== 96))}
            />
          </div>

          <div className="w-[100px] sm:w-1/3 md:w-auto">
            <Checkbox
              label="120"
              checked={value.includes(120)}
              onCheckedChange={(checked) => onChange(checked ? [...value, 120] : value.filter((n) => n !== 120))}
            />
          </div>
        </div>
      </div>

      <div className="hidden w-[115px] md:block">
        <TextField
          value={otherValue}
          placeholder="Other Value"
          type="number"
          hideDetails
          full_p={true}
          onChange={(e) => onOtherValueChange(e.target.value)}
        />
      </div>
    </div>
  );
};
