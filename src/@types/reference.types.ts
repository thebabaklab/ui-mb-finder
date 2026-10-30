export type TReference = {
  title: string;
  id: number;
  authors: string;
  year: number;
  doi: string;
  abstract: string;
  substancesCount: number;
  ceilLinesCount: number;
  // Only set when the list is for one substance: that substance's measurements in this paper.
  bioDataCount: number | null;
};
