import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@ui-kit";

import { SearchFilter } from "../../search-filter";

interface AuthorFilterProps {
  initialValue?: string;
  onSubmit: (author?: string) => void;
}

export const AuthorFilter: FC<AuthorFilterProps> = ({ initialValue, onSubmit }) => {
  const [author, setAuthor] = useState(initialValue ?? "");

  useEffect(() => {
    setAuthor(initialValue ?? "");
  }, [initialValue]);

  return (
    <SearchFilter name="Authors">
      <TextField className="text-platinum-silver" bg_color="bg-gunmetal" full_p={true} value={author} placeholder="" hideDetails dense onChange={e => setAuthor(e.target.value)} />

      <Button variant={"back"} className="font-light text-base" size="small" onClick={() => onSubmit(author || undefined)}>
        Search
      </Button>
    </SearchFilter>
  );
};
