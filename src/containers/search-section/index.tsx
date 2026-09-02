import { useEffect, useState, type FC } from "react";
import { mdiHexagonOutline, mdiMagnify } from "@mdi/js";
import { Button, Icon, Select, TextField } from "@ui-kit";
import { ENUM_SEARCH_BY } from "@types";
import { cn } from "@utils";

// Each field gets its own worked example — the point of the hint is the
// separator, which is easiest to read in the notation being searched.
const searchByOptions = [
  { name: "Name", id: ENUM_SEARCH_BY.Name, example: "cisplatin; transplatin" },
  { name: "SMILES", id: ENUM_SEARCH_BY.Smiles, example: "Cl[Au][P](CC)(CC)CC; [Cl-][Au+][P](C)(C)C" },
  { name: "CAS ID", id: ENUM_SEARCH_BY.CasRegistryNumber, example: "15663-27-1; 14913-33-8" },
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

  const searchByExample = searchByOptions.find((option) => option.id === searchBy)?.example;

  return (
    <div className={cn("flex w-full max-w-4xl flex-col gap-1", className)}>
      {/* The picker sits on its own row on phones — beside the field there is
          not enough width left for the input and the Draw button. */}
      <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {/* Sized to the widest label ("SMILES", 48px at 14px Roboto) plus the
            chevron and the trigger's own padding — fixed rather than w-fit so
            the control does not resize as the selection changes. */}
        {searchBy && (
          <div className="w-[108px] sm:w-[150px] sm:shrink-0">
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

      {searchByExample && (
        <p className="text-white/60 text-xs font-light text-center">
          You can enter multiple values separated by semicolon, e.g. {searchByExample}
        </p>
      )}
    </div>
  );
};
