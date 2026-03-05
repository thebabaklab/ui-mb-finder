import type { FC } from "react";
import { mdiClose } from "@mdi/js";
import { ENUM_SEARCH_FIELD_TYPE, type TSearchField } from "@types";
import { Button, Icon, Select } from "@ui-kit";
import { cn } from "@utils";
import { CasRegistryNumber } from "./cas-registry-number";
import { IncubationTime } from "./incubation-time";
import { MolecularWeight } from "./molecular-weight";
import { ClinicalDrug } from "./clinical-drug";
import { Smiles } from "./smiles";
import { IC50Range } from "./ic50-range";
import { Author } from "./author";
import { PublicationYear } from "./publication-year";
import { Doi } from "./doi";

interface AdvancedSearchFieldProps {
  index: number;
  field: TSearchField;
  onChange: (value: TSearchField) => void;
  onRemove: () => void;
  items: { [key: string]: string | number }[];
}

export const AdvancedSearchField: FC<AdvancedSearchFieldProps> = ({ index, field, onChange, onRemove, items }) => {
  const handleTypeChange = (type: string) => {
    switch (type) {
      case ENUM_SEARCH_FIELD_TYPE.Smiles:
        onChange({
          type,
          values: {
            smiles: ""
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.ClinicalDrug:
        onChange({
          type,
          values: {
            cliDrug: []
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber:
        onChange({
          type,
          values: {
            cas: ""
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.IncubationTime:
        onChange({
          type,
          values: {
            incuTime: []
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.MolecularWeight:
        onChange({
          type,
          values: {
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.IC50Range:
        onChange({
          type,
          values: {
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.Author:
        onChange({
          type,
          values: {
            author: ""
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.PublicationYear:
        onChange({
          type,
          values: {
          }
        });
        break;
      case ENUM_SEARCH_FIELD_TYPE.Doi:
        onChange({
          type,
          values: {
            doi: ""
          }
        });
    }
  };

  const handleLogicalOperatorChange = (logicalOperator: string) => {
    if (field.type !== "") {
      onChange({ ...field, logicalOperator });
    }
  };

  const handleSmilesChange = (smiles: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.Smiles)
      onChange({ ...field, values: { smiles: smiles } });
  };

  const handleCasRegistryNumberChange = (casRegistryNumber: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber)
      onChange({ ...field, values: { cas: casRegistryNumber } });
  };

  const handleIncubationTimeChange = (incubationTime: ("all" | number)[]) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime)
      onChange({ ...field, values: { incuTime: incubationTime.filter(value => value !== "all"), incuOther: field.values.incuOther } });
  };

  const handleOtherValueChange = (otherValue: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime)
      onChange({ ...field, values: { incuTime: field.values.incuTime, incuOther: otherValue } });
  };

  const handleClinicalDrugChange = (clinicalDrug: string[]) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug)
      onChange({ ...field, values: { cliDrug: clinicalDrug } });
  };

  const handleMolecularWeightChange = (value: string, prop: "weightStart" | "weightEnd") => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight)
      onChange({ ...field, values: { ...field.values, [prop]: Number(value ?? 0) } });
  };

  const handleIC50Change = (value: string, prop: "icStart" | "icEnd") => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.IC50Range)
      onChange({ ...field, values: { ...field.values, [prop]: Number(value ?? 0) } });
  };

  const handleAuthorChange = (author: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.Author)
      onChange({ ...field, values: { author: author } });
  };

  const handlePublicationYearChange = (value: string, prop: "pyearStart" | "pyearEnd") => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.PublicationYear)
      onChange({ ...field, values: { ...field.values, [prop]: Number(value ?? 0) } });
  };

  const handleDoiChange = (doi: string) => {
    if (field.type === ENUM_SEARCH_FIELD_TYPE.Doi)
      onChange({ ...field, values: { doi: doi } });
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
            items={items}
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

      {field.type === ENUM_SEARCH_FIELD_TYPE.Smiles && (
        <Smiles
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.values.smiles}
          onChange={handleSmilesChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.ClinicalDrug && (
        <ClinicalDrug
          index={index}
          value={field.values.cliDrug}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          onChange={handleClinicalDrugChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber && (
        <CasRegistryNumber
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.values.cas}
          onChange={handleCasRegistryNumberChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.IncubationTime && (
        <IncubationTime
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.values.incuTime}
          onChange={handleIncubationTimeChange}
          otherValue={field.values.incuOther ?? ""}
          onOtherValueChange={handleOtherValueChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.MolecularWeight && (
        <MolecularWeight
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          startWeight={String(field.values.weightStart ?? "")}
          endWeight={String(field.values.weightEnd ?? "")}
          onChange={handleMolecularWeightChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.IC50Range && (
        <IC50Range
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          icStart={String(field.values.icStart ?? "")}
          icEnd={String(field.values.icEnd ?? "")}
          onChange={handleIC50Change}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.Author && (
        <Author
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.values.author}
          onChange={handleAuthorChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.PublicationYear && (
        <PublicationYear
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          pyearStart={String(field.values.pyearStart ?? "")}
          pyearEnd={String(field.values.pyearEnd ?? "")}
          onChange={handlePublicationYearChange}
        />
      )}

      {field.type === ENUM_SEARCH_FIELD_TYPE.Doi && (
        <Doi
          index={index}
          logicalOperator={field.logicalOperator ?? ""}
          onLogicalOperatorChange={handleLogicalOperatorChange}
          value={field.values.doi}
          onChange={handleDoiChange}
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
        <Icon name={mdiClose} color="primary" />
      </Button>
    </div>
  );
};
