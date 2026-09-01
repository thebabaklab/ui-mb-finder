import { useEffect, useState, type FC } from "react";
import { mdiHexagonOutline, mdiMagnify } from "@mdi/js";
import { Button, Icon, Select, TextField } from "@ui-kit";
import { ENUM_SEARCH_BY } from "@types";
import { cn } from "@utils";

const searchByOptions = [
  { name: "Name", id: ENUM_SEARCH_BY.Name },
  { name: "SMILES", id: ENUM_SEARCH_BY.Smiles },
  { name: "CAS ID", id: ENUM_SEARCH_BY.CasRegistryNumber },
];

interface SearchSectionProps {
  initialValue?: string;
  hasSearchField: boolean;
  className?: string;
  /** Omit to hide the field picker — only the Substances search is scoped. */
  searchBy?: string;
  onSearchByChange?: (searchBy: string) => void;
  onDrawerClick?: () => void;
  onChange?: (queryStr: string) => void;
  onSearch: (queryStr?: string) => void;
}

export const SearchSection: FC<SearchSectionProps> = ({
  initialValue,
  hasSearchField,
  className,
  searchBy,
  onSearchByChange,
  onDrawerClick,
  onSearch,
}) => {
  const [queryStr, setQueryStr] = useState(initialValue ?? "");
  useEffect(() => {
    setQueryStr(initialValue ?? "");
  }, [initialValue]);

  return (
    <div className={cn("flex w-full max-w-4xl flex-col gap-1", className)}>
      {/* The picker sits on its own row on phones — beside the field there is
          not enough width left for the input and the Draw button. */}
      <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {searchBy && (
          <div className="w-full sm:w-[150px] sm:shrink-0">
            <Select
              value={searchBy}
              items={searchByOptions}
              hideDetails
              onValueChange={(value) => onSearchByChange?.(value)}
            />
          </div>
        )}

        <div className="flex grow items-center gap-2">
          <div className="grow">
            <TextField
              value={queryStr}
              className="search-bar text-base placeholder:font-semibold"
              clearable
              hideDetails
              appendInner={
                <Button
                  type="button"
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
              }
              onChange={(e) => setQueryStr(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (queryStr || hasSearchField) onSearch(queryStr || undefined);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-xl text-secondary disabled:cursor-not-allowed"
            disabled={!queryStr && !hasSearchField}
            onClick={() => onSearch(queryStr || undefined)}
          >
            <Icon name={mdiMagnify} className="search-icon" color="current" search />
          </button>
        </div>
      </div>

      {searchBy && (
        <p className="text-white/60 text-xs font-light text-center">
          You can enter several values separated by a space.
        </p>
      )}
    </div>
  );
};
