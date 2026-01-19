type TCompound = {
  imageUrl: string;
  title: string;
  doi: string;
  incubationTime: string;
  numeric_value: string;
  method: string;
  stability: string | null;
  in_vivo: string | null;
};

export type TBioData = {
  name: string;
  compounds: TCompound;
};
