import { useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchSection } from "../../../search-section";

export const ReferencesSearchSection = () => {
  const { queryStr } = useSearch({
    from: "/search/references",
  });
  const navigate = useNavigate();

  const getItems = useCallback((_queryStr: any) => {
    navigate({
      to: "/references", search: {
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
