export type TSubstance = {
  imageId: string;
  imageUrl: string;
  casNumber: string | null;
  name: string | null;
  weight: string | null;
  cLogP: string | null;
  referenceCount: number;
  ceilLineCount: number;
  bioDataCount: number;
  smiles: string;
};

export type TSelectedImage = {
  title: string;
  src: string;
};
