import { ENUM_LOGICAL_OPERATOR, ENUM_SEARCH_FIELD_TYPE } from "@types";

export const fieldTypes = [
  { name: "Clinical Drug", id: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug },
  { name: "CAS Registry Number", id: ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber },
  { name: "Incubation Time", id: ENUM_SEARCH_FIELD_TYPE.IncubationTime },
  { name: "Molecular Weight", id: ENUM_SEARCH_FIELD_TYPE.MolecularWeight },
];

export const logicalOperators = [
  { name: "...", id: ENUM_LOGICAL_OPERATOR.NoValue },
  { name: "And", id: ENUM_LOGICAL_OPERATOR.And },
  { name: "Not", id: ENUM_LOGICAL_OPERATOR.Not },
  { name: "Or", id: ENUM_LOGICAL_OPERATOR.Or },
];

export const emptySearchField = {
  type: "" as const,
};
