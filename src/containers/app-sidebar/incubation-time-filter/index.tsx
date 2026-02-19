import { type ChangeEvent, type FC, useEffect, useState } from "react";
import { Button, Checkbox, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface IncubationTimeFilterProps {
  inititalOtherValue?: string;
  initialSelectedValues?: number[];
  onSubmit: (incuTime?: number[], incuOther?: string) => void;
}

export const IncubationTimeFilter: FC<IncubationTimeFilterProps> = ({ inititalOtherValue, initialSelectedValues, onSubmit }) => {
  // const [initialValuesSet, setInitialValuesSet] = useState<number[]>([]);
  // const p
  const [incubationTime, setIncubationTime] = useState<("all" | number)[]>([]);
  const [otherValue, setOtherValue] = useState("");

  const handleChange = (value: ("all" | number)[]) => {
    setIncubationTime(value);
  };

  const handleOtherValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
  };

  useEffect(() => {
    if (initialSelectedValues?.length === 5)
      setIncubationTime(["all", ...initialSelectedValues]);
    else
      setIncubationTime(initialSelectedValues ?? []);
    setOtherValue(inititalOtherValue ?? "");
  }, [inititalOtherValue, initialSelectedValues]);

  return (
    <SearchFilter defaultOpen={!!incubationTime.length} name="Incubation Time">
      <div className="flex justify-between">
        <div className="w-1/3">
          <Checkbox
            label="All"
            checked={incubationTime.includes("all")}
            onCheckedChange={(checked) => handleChange(checked ? ["all", 24, 48, 72, 96, 120] : [])}
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="24"
            checked={incubationTime.includes(24)}
            onCheckedChange={(checked) =>
              handleChange(checked ? [...incubationTime, 24] : incubationTime.filter((n) => n !== 24))
            }
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="48"
            checked={incubationTime.includes(48)}
            onCheckedChange={(checked) =>
              handleChange(checked ? [...incubationTime, 48] : incubationTime.filter((n) => n !== 48))
            }
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-1/3">
          <Checkbox
            label="72"
            checked={incubationTime.includes(72)}
            onCheckedChange={(checked) =>
              handleChange(checked ? [...incubationTime, 72] : incubationTime.filter((n) => n !== 72))
            }
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="96"
            checked={incubationTime.includes(96)}
            onCheckedChange={(checked) =>
              handleChange(checked ? [...incubationTime, 96] : incubationTime.filter((n) => n !== 96))
            }
          />
        </div>
        <div className="w-1/3">
          <Checkbox
            label="120"
            checked={incubationTime.includes(120)}
            onCheckedChange={(checked) =>
              handleChange(checked ? [...incubationTime, 120] : incubationTime.filter((n) => n !== 120))
            }
          />
        </div>
      </div>

      <TextField
        value={otherValue}
        placeholder=""
        full_p={true}
        className="text-platinum-silver"
        bg_color="bg-gunmetal"
        type="number"
        hideDetails
        dense
        onChange={handleOtherValueChange}
      />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit([...incubationTime.filter(v => v !== "all")] as number[], otherValue)}>
        Apply
      </Button>
    </SearchFilter>
  );
};
