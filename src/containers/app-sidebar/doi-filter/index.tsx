import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface DoiFilterProps {
  initialValue?: string;
  onSubmit: (doi?: string) => void;
}

export const DoiFilter: FC<DoiFilterProps> = ({ initialValue, onSubmit }) => {
  const [doi, setDoi] = useState(initialValue ?? "");

  useEffect(() => {
    setDoi(initialValue ?? "");
  }, [initialValue]);

  return (
    <SearchFilter name="DOI">
      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={doi} placeholder="" hideDetails dense onChange={e => setDoi(e.target.value)} />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(doi || undefined)}>
        Search
      </Button>
    </SearchFilter>
  );
};
