import { type ChangeEvent, type FC } from "react";
import { Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

const OPTIONS = [24, 48, 72, 96, 120];

interface IncubationTimeFilterProps {
  inititalOtherValue?: string;
  initialSelectedValues: number[];
  onChange: (incuTime: number[]) => void;
  onOtherChange: (incuOther?: string) => void;
}

export const IncubationTimeFilter: FC<IncubationTimeFilterProps> = ({ inititalOtherValue, initialSelectedValues, onChange, onOtherChange }) => {
  const isAllSelected = OPTIONS.every((n) => initialSelectedValues.includes(n));

  const toggleValue = (num: number, checked: boolean) => {
    if (checked)
      onChange([...initialSelectedValues, num]);
    else
      onChange(initialSelectedValues.filter(n => n !== num));
  };

  const toggleAll = (checked: boolean) => {
    onChange(checked ? OPTIONS : [])
  };

  const handleOtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOtherChange(e.target.value || undefined);
  };

  return (
    <SearchFilter defaultOpen={!!initialSelectedValues.length} name="Incubation Time">
      <div className="flex justify-between">
        <div className="w-1/3">
          <Checkbox
            label="All"
            checked={isAllSelected}
            // onCheckedChange={(checked) => handleChange(checked ? ["all", 24, 48, 72, 96, 120] : [])}
            onCheckedChange={toggleAll}
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="24"
            checked={initialSelectedValues.includes(24)}
            onCheckedChange={(checked) =>
              // handleChange(checked ? [...incubationTime, 24] : incubationTime.filter((n) => n !== 24))
              toggleValue(24, !!checked)
            }
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="48"
            checked={initialSelectedValues.includes(48)}
            onCheckedChange={(checked) =>
              toggleValue(48, !!checked)
            }
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/3">
          <Checkbox
            label="72"
            checked={initialSelectedValues.includes(72)}
            onCheckedChange={(checked) =>
              toggleValue(72, !!checked)
            }
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="96"
            checked={initialSelectedValues.includes(96)}
            onCheckedChange={(checked) =>
              toggleValue(96, !!checked)
            }
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="120"
            checked={initialSelectedValues.includes(120)}
            onCheckedChange={(checked) =>
              toggleValue(120, !!checked)
            }
          />
        </div>
      </div>

      <TextField
        value={inititalOtherValue ?? ""}
        placeholder=""
        full_p={true}
        className="text-platinum-silver"
        bg_color="bg-gunmetal"
        type="number"
        hideDetails
        dense
        onChange={handleOtherChange}
      />
    </SearchFilter>
  );
};
