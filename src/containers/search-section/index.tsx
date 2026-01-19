import type { FC } from "react";

import { mdiHexagonOutline, mdiMagnify } from "@mdi/js";
import { useLocation } from "@tanstack/react-router";
import type { TSearch } from "@types";
import { Button, Icon, TextField } from "@ui-kit";
import { cn } from "@utils";

interface SearchSectionProps {
  search: TSearch;
  hasSearchField: boolean;
  className?: string;
  onDrawerClick?: () => void;
  onChange: (queryStr: string) => void;
  onSearch: () => void;
}

export const SearchSection: FC<SearchSectionProps> = ({
  search,
  hasSearchField,
  className,
  onDrawerClick,
  onChange,
  onSearch,
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={cn("flex items-center w-full gap-2", className)}>
      <form
        className="grow"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <TextField
          value={search.queryStr}
          // placeholder="Search by Keyword, CAS Number, SMILES, Authors, DOI"
          className="search-bar text-base placeholder:font-semibold"
          clearable
          hideDetails
          full_p={pathname === "/" ? false : true}
          appendInner={
            pathname === "/" ? (
              <Button
                variant="draw"
                size="draw"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDrawerClick?.();
                }}
              >
                Draw
                <Icon name={mdiHexagonOutline} color="white" large />
              </Button>
            ) : undefined
          }
          onChange={(e) => onChange(e.target.value)}
        />
      </form>
      <button
        type="submit"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-xl text-secondary disabled:cursor-not-allowed"
        disabled={!search.queryStr && !hasSearchField}
        onClick={onSearch}
      >
        <Icon name={mdiMagnify} className="search-icon" color="current" search />
      </button>
    </div>
  );
};
