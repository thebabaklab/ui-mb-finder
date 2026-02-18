import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface AuthorFilterProps {
  initialValue?: string;
  onSubmit: (author?: string) => void;
}

export const AuthorFilter: FC<AuthorFilterProps> = ({ initialValue, onSubmit }) => {
  // const search = useStore((s) => s.search);
  // const setSearch = useStore((s) => s.setSearch);
  const [author, setAuthor] = useState(initialValue ?? "");

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newFilters: TFilterItem[] = search.filters.filter((f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.Author);

  //   if (e.target.value) {
  //     newFilters.push({
  //       filterType: ENUM_SEARCH_FIELD_TYPE.Author,
  //       filterValue: e.target.value,
  //     });
  //   }

  //   setSearch({ ...search, filters: newFilters });
  //   setAuthor(e.target.value);
  // };

  useEffect(() => {
    // const searchedAuthor = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.Author);
    // if (searchedAuthor) {
    //   setAuthor(searchedAuthor.filterValue);
    // } else {
    //   setAuthor("");
    // }
    setAuthor(initialValue ?? "");
  }, [initialValue]);
  // }, [search.filters]);

  return (
    <SearchFilter name="Authors">
      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={author} placeholder="" hideDetails dense onChange={e => setAuthor(e.target.value)} />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(author || undefined)}>
        Search
      </Button>
    </SearchFilter>
  );
};
