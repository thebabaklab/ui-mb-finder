import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface DoiFilterProps {
  initialValue?: string;
  onChange: (doi?: string) => void;
}

export const DoiFilter: FC<DoiFilterProps> = ({ initialValue, onChange }) => {
  return (
    <SearchFilter name="DOI">
      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={initialValue ?? ""} placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />
    </SearchFilter>
  );
};
