import { type ChangeEvent, type FC, useEffect, useState } from "react";

import { useStore } from "@store";
import { ENUM_SEARCH_FIELD_TYPE, type TFilterItem } from "@types";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface AuthorFilterProps {
  onSubmit: () => void;
}

export const AuthorFilter: FC<AuthorFilterProps> = ({ onSubmit }) => {
  const search = useStore((s) => s.search);
  const setSearch = useStore((s) => s.setSearch);
  const [author, setAuthor] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilters: TFilterItem[] = search.filters.filter((f) => f.filterType !== ENUM_SEARCH_FIELD_TYPE.Author);

    if (e.target.value) {
      newFilters.push({
        filterType: ENUM_SEARCH_FIELD_TYPE.Author,
        filterValue: e.target.value,
      });
    }

    setSearch({ ...search, filters: newFilters });
  };

  useEffect(() => {
    const searchedAuthor = search.filters.find((f) => f.filterType === ENUM_SEARCH_FIELD_TYPE.Author);
    if (searchedAuthor) {
      setAuthor(searchedAuthor.filterValue);
    } else {
      setAuthor("");
    }
  }, [search.filters]);

  return (
    <SearchFilter name="Authors">
      <TextField value={author} placeholder="Enter Last Name..." hideDetails dense onChange={handleChange} />

      <Button size="small" onClick={onSubmit}>
        Search
      </Button>
    </SearchFilter>
  );
};
