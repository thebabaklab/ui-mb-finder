import { type FC } from "react";
import { TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface AuthorFilterProps {
  initialValue?: string;
  onChange: (author?: string) => void;
}

export const AuthorFilter: FC<AuthorFilterProps> = ({ initialValue, onChange }) => {
  return (
    <SearchFilter name="Authors">
      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={initialValue ?? ""} placeholder="" hideDetails dense onChange={e => onChange(e.target.value || undefined)} />
    </SearchFilter>
  );
};
