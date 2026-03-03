import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface SmilesFilterFilterProps {
  initialValue?: string;
  onChange: (smiles?: string) => void;
}

export const SmilesFilter: FC<SmilesFilterFilterProps> = ({ initialValue, onChange }) => {
  return (
    <SearchFilter defaultOpen={!!initialValue} name="SMILES">
      <TextField className="text-platinum-silver" value={initialValue ?? ""} full_p={true} bg_color="bg-gunmetal" placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />
    </SearchFilter>
  );
};
