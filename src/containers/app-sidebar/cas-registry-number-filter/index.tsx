import { type FC } from "react";
import { TextField } from "@ui-kit";
import { SearchFilter } from "../../search-filter";

interface CasRegistryNumberFilterProps {
  initialValue?: string;
  onChange: (cas?: string) => void;
}

export const CasRegistryNumberFilter: FC<CasRegistryNumberFilterProps> = ({ initialValue, onChange }) => {
  return (
    <SearchFilter defaultOpen={!!initialValue} name="CAS Registry Number">
      <TextField
        value={initialValue ?? ""}
        placeholder=""
        className="text-platinum-silver"
        full_p={true}
        bg_color="bg-gunmetal"
        hideDetails
        dense
        onChange={e => onChange(e.target.value || undefined)}
      />
    </SearchFilter>
  );
};
