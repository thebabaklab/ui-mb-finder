import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface DoiFilterProps {
  initialValue?: string;
  onSubmit: (doi?: string) => void;
}

export const DoiFilter: FC<DoiFilterProps> = ({ initialValue, onSubmit }) => {
  // const search = useStore((s) => s.search);
  // const setSearch = useStore((s) => s.setSearch);
  const [doi, setDoi] = useState(initialValue ?? "");

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newFilters: TFilterItem[] = search.filters.filter((f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.Doi);

  //   if (e.target.value) {
  //     newFilters.push({
  //       filterType: ENUM_SEARCH_FIELD_TYPE.Doi,
  //       filterValue: e.target.value,
  //     });
  //   }

  //   setSearch({ ...search, filters: newFilters });
  //   setDoi(e.target.value);
  // };

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
