import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchSection } from "../../../search-section";

export const BioDataSearchSection = () => {
  const { queryStr } = useSearch({ strict: false });
  const navigate = useNavigate();

  const getItems = useCallback((_queryStr: any) => {
    navigate({
      to: "/cell-lines", search: {
        page: 1,
        queryStr: _queryStr,
      }
    });
  }, [
    navigate
  ]);

  const handleSearch = (_queryStr: any) => {
    getItems(_queryStr);
  };

  return (
    <SearchSection
      hasSearchField={false}
      className="w-full md:w-[936px] max-w-4xl"
      initialValue={queryStr}
      onSearch={(value: any) => handleSearch(value)}
    />
  );
};
