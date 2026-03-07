import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { Button, Icon, Select } from "@ui-kit";
import { ENUM_SEARCH_FIELD_TYPE, type TSearchField } from "@types";
import { mdiPlus } from "@mdi/js";
import { fieldTypes } from "../../advanced-search-field/advanced-search-field.consts";

export const CellLinesSidebar = () => {
  const { imgId, filters: filtersString } = useSearch({ from: "/search/cell-lines" });
  const navigate = useNavigate();
  const parsedFilters: TSearchField[] = filtersString ? JSON.parse(filtersString) : [];
  const [filters, setFilters] = useState<TSearchField[]>(parsedFilters);
  const [pendingFilter, setPendingFilter] = useState(false);

  const handleAddFilter = (type: string) => {
    addFilter(type);
    setPendingFilter(false);
  }

  const addFilter = (type: string) => {
    let newFilter: TSearchField;

    switch (type) {
      case ENUM_SEARCH_FIELD_TYPE.IncubationTime:
        newFilter = {
          type,
          values: {
            incuTime: []
          }
        }
        break;
      case ENUM_SEARCH_FIELD_TYPE.IC50Range:
        newFilter = {
          type,
          values: {
          }
        }
        break;
    }

    setFilters(prev => [...prev, newFilter]);
  }

  const updateFilter = (index: number, newFilter: TSearchField) => {
    setFilters(prev => {
      const updated = [...prev];
      updated[index] = newFilter;
      return updated;
    })
  }

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  }

  const validateFilters = (_filters: TSearchField[]) => {
    for (let i = 0; i < _filters.length; i++) {
      const filter = _filters[i];
      const isLast = i === _filters.length - 1;

      if (filter.type === "" || filter.type === "error")
        continue;

      if (!isLast && !filter.logicalOperator) {
        return {
          valid: false,
          message: `Filter #${i + 1} must have a logical operator`
        }
      }

      switch (filter.type) {
        case ENUM_SEARCH_FIELD_TYPE.IncubationTime:
          if (!filter.values?.incuTime.length && !filter.values?.incuOther)
            return {
              valid: false,
              message: "Incubation time filter requires a value"
            }
          break;

        case ENUM_SEARCH_FIELD_TYPE.IC50Range:
          if (!filter.values?.icStart && !filter.values?.icEnd)
            return {
              valid: false,
              message: "IC Range filter requires a start or end value"
            }
          break;
      }
    }

    return { valid: true }
  }

  const applyFilters = () => {
    const validation = validateFilters(filters);

    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    navigate({
      to: "/cell-lines", search: (prev) => ({
        ...prev,
        page: 1,
        filters: JSON.stringify(filters)
      })
    });
  }

  useEffect(() => {
    setFilters(parsedFilters);
  }, [imgId, filtersString]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      {filters.map((field, index) => {
        switch (field.type) {
          case ENUM_SEARCH_FIELD_TYPE.IncubationTime:
            return (
              <IncubationTimeFilter
                key={index}
                hasLogicOperator={index !== filters.length - 1}
                initialSelectedValues={field.values.incuTime}
                inititalOtherValue={field.values.incuOther}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(values) => updateFilter(index, { ...field, values: { ...field.values, incuTime: values } })}
                onOtherChange={(value) => updateFilter(index, { ...field, values: { ...field.values, incuOther: value } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
            )

          case ENUM_SEARCH_FIELD_TYPE.IC50Range:
            return (
              <Ic50RangeFilter
                key={index}
                hasLogicOperator={index !== filters.length - 1}
                initialIcStart={field.values.icStart ?? 0}
                initialIcEnd={field.values.icEnd ?? 0}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(values_ic) => updateFilter(index, { ...field, values: { ...values_ic } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })} />
            )
        }
      })}

      {pendingFilter && (
        <Select
          placeholder="Select Field Type"
          items={fieldTypes["cell-lines"]}
          hideDetails
          onValueChange={handleAddFilter}
        />
      )}

      {!pendingFilter && (
        <Button className="gap-2 bg-transparent shadow-none text-xl font-light hover:bg-transparent hover:text-primary" onClick={() => setPendingFilter(true)}>
          Add Field
          <Icon name={mdiPlus} className="bg-secondary rounded-full" color="current" add_sf />
        </Button>
      )}
    </div>
  );
};
