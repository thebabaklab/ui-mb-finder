import { ENUM_SEARCH_FIELD_TYPE } from "./enums";

export type TSearchField =
  | { type: "" }
  | { type: "error" }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.Smiles;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      smiles: string;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      cliDrug: string[];
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      cas: string;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.IncubationTime;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      incuTime: number[];
      incuOther?: string;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.MolecularWeight;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      weightStart?: number;
      weightEnd?: number;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.IC50Range;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      icStart?: number;
      icEnd?: number;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.Author;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      author: string;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.PublicationYear;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      pyearStart?: number;
      pyearEnd?: number;
    }
  }
  | {
    type: ENUM_SEARCH_FIELD_TYPE.Doi;
    negate?: boolean;
    logicalOperator?: string;
    values: {
      doi: string;
    }
  }

