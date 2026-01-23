import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, Checkbox, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface IncubationTimeFilterProps {
  onSubmit: () => void;
}

export const IncubationTimeFilter: FC<IncubationTimeFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [incubationTime, setIncubationTime] = useState<("all" | number)[]>([]);
  const [otherValue, setOtherValue] = useState("");

  const handleChange = (value: ("all" | number)[]) => {
    const newFilters: TFilterItem[] = search.filters.filter(
      (f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.IncubationTime
    );

    if (value.length) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.IncubationTime,
        filterValue: [...value.filter((f) => f !== "all"), otherValue],
      });
    } else if (otherValue) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.IncubationTime,
        filterValue: [otherValue],
      });
    }

    setSearch({ ...search, filters: newFilters });
    setIncubationTime(value);
  };

  const handleOtherValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilters: TFilterItem[] = search.filters.filter(
      (f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.IncubationTime
    );

    if (e.target.value) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.IncubationTime,
        filterValue: [...incubationTime.filter((f) => typeof f !== "string"), e.target.value],
      });
    } else if (incubationTime.length) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.IncubationTime,
        filterValue: [...incubationTime.filter((f) => typeof f !== "string")],
      });
    }

    setSearch({ ...search, filters: newFilters });
    setOtherValue(e.target.value);
  };

  useEffect(() => {
    if (!initialValuesSet) {
      setInitialValuesSet(true);

      const searchedIncubationTime = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.IncubationTime);

      if (searchedIncubationTime) {
        if (Array.isArray(searchedIncubationTime.filterValue)) {
          const searchedOtherValue = searchedIncubationTime.filterValue.find((f) => typeof f === "string");

          if (searchedOtherValue) setOtherValue(searchedOtherValue);

          const filterValue = searchedIncubationTime.filterValue.filter((f) => typeof f !== "string");

          setIncubationTime([...(filterValue.length === 5 ? ["all"] : []), ...filterValue] as ("all" | number)[]);
        }
      }
    }
  }, [initialValuesSet, search.filters]);

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

      <Button variant={"back"} className="font-light text-base" size="small" onClick={onSubmit}>
        Apply
      </Button>
    </SearchFilter>
  );
};
