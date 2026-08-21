import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Ic50RangeFilter } from "../ic50-range-filter";
import { IncubationTimeFilter } from "../incubation-time-filter";
import { CellLineFilter } from "../cell-line-filter";
import { DoiFilter } from "../doi-filter";
import { MethodFilter } from "../method-filter";
import { useStore } from "@store";
import { Button, Icon, Select } from "@ui-kit";
import { ENUM_SEARCH_FIELD_TYPE, type TSearchField } from "@types";
import { mdiPlus } from "@mdi/js";
import { fieldTypes } from "../../advanced-search-field/advanced-search-field.consts";

export const BioDataSidebar = () => {
  // Rendered on both bio data routes — the cell-line-scoped one and the substance-scoped
  // one — so params are read loosely and only one of cellId / imgId is ever set.
  const { cellId, imgId } = useParams({ strict: false });
  const { filters: filtersString } = useSearch({ strict: false });
  const navigate = useNavigate();
  const setDialogs = useStore((s) => s.setDialogs);
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
      case ENUM_SEARCH_FIELD_TYPE.Doi:
        newFilter = {
          type,
          values: {
            doi: ""
          }
        }
        break;
      case ENUM_SEARCH_FIELD_TYPE.Method:
        newFilter = {
          type,
          values: {
            method: ""
          }
        }
        break;
      case ENUM_SEARCH_FIELD_TYPE.CellLines:
        newFilter = {
          type,
          values: {
            cellLine: ""
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
        case ENUM_SEARCH_FIELD_TYPE.Doi:
          if (!filter.values?.doi)
            return {
              valid: false,
              message: "DOI filter requires a value"
            }
          break;

        case ENUM_SEARCH_FIELD_TYPE.Method:
          if (!filter.values?.method)
            return {
              valid: false,
              message: "Method filter requires a value"
            }
          break;

        case ENUM_SEARCH_FIELD_TYPE.CellLines:
          if (!filter.values?.cellLine)
            return {
              valid: false,
              message: "Cell Line filter requires a value"
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

    // On mobile these sidebars live in the filter dialog; without this it stays
    // open over the results and Apply looks like it did nothing.
    setDialogs([]);

    if (imgId) {
      navigate({
        to: "/substances/bio-data/$imgId", params: { imgId: imgId }, search: (prev) => ({
          ...prev,
          page: 1,
          filters: JSON.stringify(filters)
        })
      });
      return;
    }

    if (!cellId) return;

    navigate({
      to: "/cell-lines/bio-data/$cellId", params: { cellId: cellId }, search: (prev) => ({
        ...prev,
        page: 1,
        filters: JSON.stringify(filters)
      })
    });
  }

  useEffect(() => {
    setFilters(parsedFilters);
  }, [cellId, imgId, filtersString]);

  return (
    <form className="flex flex-col p-4 gap-4" onSubmit={(e) => {
      e.preventDefault();
      applyFilters();
    }}>
      <Button variant={"back"} className="font-light text-base" size="small" type="submit">
        Apply
      </Button>

      {filters.map((field, index) => {
        switch (field.type) {
          case ENUM_SEARCH_FIELD_TYPE.IncubationTime:
            return (
              <IncubationTimeFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
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
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                initialIcStart={field.values.icStart ?? 0}
                initialIcEnd={field.values.icEnd ?? 0}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(values_ic) => updateFilter(index, { ...field, values: { ...values_ic } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })} />
            )
          case ENUM_SEARCH_FIELD_TYPE.Doi:
            return (
              <DoiFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                initialValue={field.values.doi}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(value) => updateFilter(index, { ...field, values: { doi: value ?? "" } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
            )

          case ENUM_SEARCH_FIELD_TYPE.Method:
            return (
              <MethodFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                initialValue={field.values.method}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(value) => updateFilter(index, { ...field, values: { method: value ?? "" } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
            )

          case ENUM_SEARCH_FIELD_TYPE.CellLines:
            return (
              <CellLineFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                initialValue={field.values.cellLine}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(value) => updateFilter(index, { ...field, values: { cellLine: value ?? "" } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
            )
        }
      })}

      {pendingFilter && (
        <Select
          placeholder="Select Field Type"
          items={fieldTypes["bio-data"]}
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
    </form>
  );
};

