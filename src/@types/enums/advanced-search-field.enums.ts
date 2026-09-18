export enum ENUM_SEARCH_FIELD_TYPE {
  Smiles = "SMILES",
  CasRegistryNumber = "CAS_NUMBER",
  IncubationTime = "INCUBATION_TIME",
  ClinicalDrug = "COMPLEX_NAME",
  MolecularWeight = "MOLECULAR_WEIGHT",
  IC50Range = "IC50_RANGE",
  Author = "AUTHOR",
  CellLines = "CELLS_LINES",
  PublicationYear = "YEAR_RANGE",
  Doi = "DOI",
  Method = "METHOD",
}

export enum ENUM_LOGICAL_OPERATOR {
  And = "AND",
  // Not = "NOT",
  Or = "OR",
}

// Field the main Substances search box is scoped to. Name is the default.
export enum ENUM_SEARCH_BY {
  Name = "NAME",
  Smiles = "SMILES",
  CasRegistryNumber = "CAS_NUMBER",
  MbId = "MB_ID",
}

// Field the Cell Lines search box is scoped to. The code is the default.
export enum ENUM_CELL_LINE_SEARCH_BY {
  CellLine = "CELL_LINE",
  Tissue = "TISSUE",
}
