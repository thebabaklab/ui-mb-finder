import type { FC } from "react";

import { mdiClose } from "@mdi/js";
import { ENUM_SEARCH_FIELD_TYPE, type TClinicalDrug, type TSearchField } from "@types";
import { Button, Icon, Select } from "@ui-kit";
import { cn } from "@utils";

import { fieldTypes } from "./advanced-search-field.consts";
import { CasRegistryNumber } from "./cas-registry-number";
import { ClinicalDrug } from "./clinical-drug";
import { IncubationTime } from "./incubation-time";
import { MolecularWeight } from "./molecular-weight";

interface AdvancedSearchFieldProps {
  field: TSearchField;
  onChange: (value: TSearchField) => void;
  onRemove: () => void;
}

export const AdvancedSearchField: FC<AdvancedSearchFieldProps> = ({ field, onChange, onRemove }) => {
  const handleTypeChange = (type: string) => {
    if (type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug) {
      onChange({
        type,
        clinicalDrug: [],
      });
    } else if (type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber) {
      onChange({
        type,
        logicalOperator: "",
        casRegistryNumber: "",
      });
    } else if (type === ENUM_SEARCH_FIELD_TYPE.IncubationTime) {
      onChange({
        type,
        logicalOperator: "",
        incubationTime: [],
        otherValue: "",
      });
    } else if (type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight) {
      onChange({
        type,
        logicalOperator: "",
        startWeight: "",
        endWeight: "",
      });
    }
  };

  const handleLogicalOperatorChange = (logicalOperator: string) => {
    if (field.type && field.type !== ENUM_SEARCH_FIELD_TYPE.ClinicalDrug) {
      onChange({ ...field, logicalOperator });
    }
  };

  const handleCasRegistryNumberChange = (casRegistryNumber: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber) {
      onChange({ ...field, casRegistryNumber });
    }
  };

  const handleIncubationTimeChange = (incubationTime: ("all" | number)[]) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime) {
      onChange({ ...field, incubationTime });
    }
  };

  const handleOtherValueChange = (otherValue: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime) {
      onChange({ ...field, otherValue });
    }
  };

  const handleClinicalDrugChange = (clinicalDrug: TClinicalDrug[]) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug) {
      onChange({ ...field, clinicalDrug });
    }
  };

  const handleMolecularWeightChange = (value: string, prop: "startWeight" | "endWeight") => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight) {
      onChange({ ...field, [prop]: value });
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-8 md:gap-5 lg:gap-22 justify-between",
        field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug
          ? "sm:flex-row sm:items-center"
          : field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber ||
              field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight
            ? "md:flex-row md:items-center"
            : "lg:flex-row lg:items-center"
      )}
    >
      <div className="flex items-center">
        <div className="w-[205px]">
          <Select
            value={field.type}
            placeholder="Select Field Type"
            items={fieldTypes}
            hideDetails
            onValueChange={handleTypeChange}
          />
        </div>

        <Button
          variant="close_icon"
          size="icon"
          className={cn(
            "ml-auto",
            field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug
              ? "sm:hidden"
              : field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber ||
                  field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight
                ? "md:hidden"
                : "lg:hidden"
          )}
          onClick={onRemove}
        >
          <Icon name={mdiClose} color="primary" />
        </Button>
      </div>

      {field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber && (
        <CasRegistryNumber
          logicalOperator={field.logicalOperator}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.casRegistryNumber}
          onChange={handleCasRegistryNumberChange}
        />
      )}
      {field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime && (
        <IncubationTime
          logicalOperator={field.logicalOperator}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.incubationTime}
          onChange={handleIncubationTimeChange}
          otherValue={field.otherValue}
          onOtherValueChange={handleOtherValueChange}
        />
      )}
      {field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug && (
        <ClinicalDrug value={field.clinicalDrug} onChange={handleClinicalDrugChange} />
      )}
      {field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight && (
        <MolecularWeight
          logicalOperator={field.logicalOperator}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          startWeight={field.startWeight}
          endWeight={field.endWeight}
          onChange={handleMolecularWeightChange}
        />
      )}

      <Button
        variant="close_icon"
        size="icon"
        className={cn(
          "hidden",
          field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug
            ? "sm:inline-flex"
            : field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber ||
                field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight
              ? "md:inline-flex"
              : "lg:inline-flex"
        )}
        onClick={onRemove}
      >
        <Icon name={mdiClose} color="primary"/>
      </Button>
    </div>
  );
};
