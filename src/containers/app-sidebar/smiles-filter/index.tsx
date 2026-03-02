import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface SmilesFilterFilterProps {
  initialValue?: string;
  onSubmit: (smiles?: string) => void;
}

export const SmilesFilter: FC<SmilesFilterFilterProps> = ({ initialValue, onSubmit }) => {
  const [smiles, setSmiles] = useState(initialValue ?? "");

  useEffect(() => {
    setSmiles(initialValue ?? "");
  }, [initialValue]);

  return (
    <SearchFilter defaultOpen={!!smiles} name="SMILES">
      <TextField className="text-platinum-silver" value={smiles} full_p={true} bg_color="bg-gunmetal" placeholder="" hideDetails dense onChange={e => setSmiles(e.target.value)} />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(smiles || undefined)}>
        Search
      </Button>
    </SearchFilter>
  );
};
