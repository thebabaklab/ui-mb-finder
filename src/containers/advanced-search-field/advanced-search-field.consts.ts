import { ENUM_LOGICAL_OPERATOR, ENUM_SEARCH_FIELD_TYPE } from "@types";

export const fieldTypes = {
  "substances": [
    { name: "SMILES", id: ENUM_SEARCH_FIELD_TYPE.Smiles },
    { name: "Clinical Drug", id: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug },
    { name: "CAS Registry Number", id: ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber },
    { name: "Incubation Time", id: ENUM_SEARCH_FIELD_TYPE.IncubationTime },
    { name: "Molecular Weight", id: ENUM_SEARCH_FIELD_TYPE.MolecularWeight },
    { name: "DOI", id: ENUM_SEARCH_FIELD_TYPE.Doi },
    { name: "Method", id: ENUM_SEARCH_FIELD_TYPE.Method },
    { name: "Cell Line", id: ENUM_SEARCH_FIELD_TYPE.CellLines },
  ],
  // No Cell Line here: the search itself is over cell lines, so filtering by one is redundant.
  "cell-lines": [
    { name: "Incubation Time", id: ENUM_SEARCH_FIELD_TYPE.IncubationTime },
    { name: "IC50μM", id: ENUM_SEARCH_FIELD_TYPE.IC50Range },
    { name: "DOI", id: ENUM_SEARCH_FIELD_TYPE.Doi },
    { name: "Method", id: ENUM_SEARCH_FIELD_TYPE.Method },
  ],
  // Bio data spans the cell lines a substance was tested on, so narrowing by one belongs here.
  "bio-data": [
    { name: "Incubation Time", id: ENUM_SEARCH_FIELD_TYPE.IncubationTime },
    { name: "IC50μM", id: ENUM_SEARCH_FIELD_TYPE.IC50Range },
    { name: "DOI", id: ENUM_SEARCH_FIELD_TYPE.Doi },
    { name: "Method", id: ENUM_SEARCH_FIELD_TYPE.Method },
    { name: "Cell Line", id: ENUM_SEARCH_FIELD_TYPE.CellLines },
  ],
  "references": [
    { name: "Authors", id: ENUM_SEARCH_FIELD_TYPE.Author },
    { name: "Publication Year", id: ENUM_SEARCH_FIELD_TYPE.PublicationYear },
    { name: "DOI", id: ENUM_SEARCH_FIELD_TYPE.Doi },
    { name: "Clinical Drug", id: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug },
  ],
};

export const logicalOperators = [
  { name: "AND", id: ENUM_LOGICAL_OPERATOR.And },
  // { name: "Not", id: ENUM_LOGICAL_OPERATOR.Not },
  { name: "OR", id: ENUM_LOGICAL_OPERATOR.Or },
];

export const emptySearchField = {
  type: "" as const,
};
