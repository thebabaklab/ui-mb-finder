import { ENUM_SEARCH_FIELD_TYPE } from "./enums";

export type TClinicalDrug = "Cisplatin" | "Carboplatin" | "Oxaliplatin";

export type TSearchField =
  | { type: "" }
  | {
      type: ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber;
      logicalOperator: string;
      casRegistryNumber: string;
    }
  | {
      type: ENUM_SEARCH_FIELD_TYPE.IncubationTime;
      logicalOperator: string;
      incubationTime: ("all" | number)[];
      otherValue: string;
    }
  | {
      type: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug;
      clinicalDrug: TClinicalDrug[];
    }
  | {
      type: ENUM_SEARCH_FIELD_TYPE.MolecularWeight;
      logicalOperator: string;
      startWeight: string;
      endWeight: string;
    };
