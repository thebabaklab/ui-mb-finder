import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface CasRegistryNumberFilterProps {
  initialValue?: string;
  onSubmit: (cas?: string) => void;
}

export const CasRegistryNumberFilter: FC<CasRegistryNumberFilterProps> = ({ initialValue, onSubmit }) => {
  const [casRegistryNumber, setCasRegistryNumber] = useState(initialValue ?? "");

  useEffect(() => {
    setCasRegistryNumber(initialValue ?? "");
  }, [initialValue]);

  return (
    <SearchFilter defaultOpen={!!casRegistryNumber} name="CAS Registry Number">
      <TextField
        value={casRegistryNumber}
        placeholder=""
        className="text-platinum-silver"
        full_p={true}
        bg_color="bg-gunmetal"
        hideDetails
        dense
        onChange={e => setCasRegistryNumber(e.target.value)}
      />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(casRegistryNumber || undefined)}>
        Search
      </Button>
    </SearchFilter>
  );
};
