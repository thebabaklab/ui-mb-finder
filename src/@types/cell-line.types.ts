export type TCellLine = {
  id: string;
  name: string;
  /** Null for a cell line the tissue list does not cover yet. */
  tissue: string | null;
  substancesCount: number;
  referenceCount: number;
  bioDataCount: number;
};
