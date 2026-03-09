import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AuthorFilter } from "../author-filter";
import { PublicationYearFilter } from "../publication-year-filter";
import { DoiFilter } from "../doi-filter";
import { ClinicalDrugFilter } from "../clinical-drug-filter";
import { Button, Icon, Select } from "@ui-kit";
import { ENUM_SEARCH_FIELD_TYPE, type TSearchField } from "@types";
import { fieldTypes } from "../../advanced-search-field/advanced-search-field.consts";
import { mdiPlus } from "@mdi/js";

export const ReferencesSidebar = () => {
  const { imgId, ceillineName, filters: filtersString } = useSearch({
    from: "/search/references",
  });
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
      case ENUM_SEARCH_FIELD_TYPE.Author:
        newFilter = {
          type,
          values: {
            author: ""
          }
        };
        break;
      case ENUM_SEARCH_FIELD_TYPE.PublicationYear:
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
        };
        break;
      case ENUM_SEARCH_FIELD_TYPE.ClinicalDrug:
        newFilter = {
          type,
          values: {
            cliDrug: []
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
        case ENUM_SEARCH_FIELD_TYPE.Author:
          if (!filter.values?.author)
            return {
              valid: false,
              message: "Author filter requires a value"
            }
          break;

        case ENUM_SEARCH_FIELD_TYPE.PublicationYear:
          if (!filter.values?.pyearStart && !filter.values?.pyearEnd)
            return {
              valid: false,
              message: "Publication Year filter requires a start or end value"
            }
          break;

        case ENUM_SEARCH_FIELD_TYPE.Doi:
          if (!filter.values?.doi)
            return {
              valid: false,
              message: "DOI filter requires a value"
            }
          break;

        case ENUM_SEARCH_FIELD_TYPE.ClinicalDrug:
          if (!filter.values?.cliDrug.length)
            return {
              valid: false,
              message: "Clinical Drug filter requires at least one value"
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
      to: "/references", search: (prev) => ({
        ...prev,
        page: 1,
        filters: JSON.stringify(filters)
      })
    });
  }

  useEffect(() => {
    setFilters(parsedFilters);
  }, [imgId, ceillineName, filtersString]);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Button variant={"back"} className="font-light text-base" size="small" onClick={applyFilters}>
        Apply
      </Button>

      {filters.map((field, index) => {
        switch (field.type) {
          case ENUM_SEARCH_FIELD_TYPE.Author:
            return (
              <AuthorFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                initialValue={field.values.author}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(value) => updateFilter(index, { ...field, values: { author: value ?? "" } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
            )

          case ENUM_SEARCH_FIELD_TYPE.PublicationYear:
            return (
              <PublicationYearFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                start_initialValue={field.values.pyearStart ?? 0}
                end_initialValue={field.values.pyearEnd ?? 0}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(value_years) => updateFilter(index, { ...field, values: { ...value_years } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
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

          case ENUM_SEARCH_FIELD_TYPE.ClinicalDrug:
            return (
              <ClinicalDrugFilter
                key={index}
                negate={field.negate ?? false}
                onNegateChange={(negate) => updateFilter(index, { ...field, negate: negate })}
                hasLogicOperator={index !== filters.length - 1}
                initialValue={field.values.cliDrug}
                logicalOperator={field.logicalOperator}
                onRemove={() => removeFilter(index)}
                onChange={(value) => updateFilter(index, { ...field, values: { cliDrug: value ?? [] } })}
                onLogicalOperatorChange={(operator) => updateFilter(index, { ...field, logicalOperator: operator })}
              />
            )
        }
      })}

      {pendingFilter && (
        <Select
          placeholder="Select Field Type"
          items={fieldTypes["references"]}
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
