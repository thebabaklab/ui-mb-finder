export type TCellLine = {
  id: string;
  name: string;
  /** Null for a cell line the tissue list does not cover yet. */
  tissue: string | null;
  /** "Human", "Mouse"… Null for a line not matched to Cellosaurus yet. */
  species: string | null;
  /** The Cellosaurus line(s) this name is — several for a name with several meanings. */
  cellosaurus: {
    accession: string;
    species: string | null;
    /** Cellosaurus's note on a contaminated or misidentified line, if it has one. */
    warning: string | null;
  }[];
  /** The synonym that made a search find this line, when its code did not. */
  matchedSynonym: string | null;
  substancesCount: number;
  referenceCount: number;
  bioDataCount: number;
};
