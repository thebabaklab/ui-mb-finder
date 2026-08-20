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

// One card groups every measurement of the same substance, paper and cell line —
// they usually differ only by incubation time.
type TMeasurement = {
  id: number;
  incubationTime: string;
  numeric_value: string;
  method: string;
  stability: string | null;
  in_vivo: string | null;
};

export type TBioData = {
  name: string;
  compounds: TCompound;
  measurements: TMeasurement[];
};
