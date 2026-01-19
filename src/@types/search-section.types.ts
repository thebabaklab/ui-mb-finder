import type { TClinicalDrug } from "./advanced-search-field.types";
import { ENUM_SEARCH_FIELD_TYPE } from "./enums";

export type TFilterItem =
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.Smiles;
      filterValue: string;
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.CasRegistryNumber;
      filterValue: string;
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.IncubationTime;
      filterValue: (string | number)[];
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.ClinicalDrug;
      filterValue: TClinicalDrug[];
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.MolecularWeight;
      filterValue: { startWeight?: string; endWeight?: string };
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.IC50Range;
      filterValue: { startIC50?: string; endIC50?: string };
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.Author;
      filterValue: string;
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.CellLines;
      filterValue: string;
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.PublicationYear;
      filterValue: { startYear?: string; endYear?: string };
    }
  | {
      filterType: ENUM_SEARCH_FIELD_TYPE.Doi;
      filterValue: string;
    };

export type TSearch = {
  queryStr: string;
  filters: TFilterItem[];
  cellLinesTable: string;
  complexTable: string;
  compoundId: string;
  filterInnerQuery?: string;
  size: number;
  title: string;
  imgId: string;
  cellId?: number;
};
