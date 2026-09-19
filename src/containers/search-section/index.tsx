import { useEffect, useState, type FC } from "react";
import { mdiHexagonOutline, mdiMagnify } from "@mdi/js";
import { Button, Icon, MultiSelect, Select, TextField } from "@ui-kit";
import { ENUM_CELL_LINE_SEARCH_BY, ENUM_SEARCH_BY } from "@types";
import { cn } from "@utils";

export type TSearchByOption = {
  name: string;
  id: string;
  /** Worked example for the semicolon hint. Omitted for a field picked from a list. */
  example?: string;
  /** Extra sentence appended to the hint, for a field whose matching needs explaining. */
  note?: string;
  /** Prompt shown by the value dropdown, for a field picked from a list. */
  placeholder?: string;
};

// Each field gets its own worked example — the point of the hint is the
// separator, which is easiest to read in the notation being searched.
export const substanceSearchByOptions: TSearchByOption[] = [
  { name: "Name", id: ENUM_SEARCH_BY.Name, example: "cisplatin; transplatin" },
  { name: "SMILES", id: ENUM_SEARCH_BY.Smiles, example: "Cl[Au][P](CC)(CC)CC; [Cl-][Au+][P](C)(C)C" },
  { name: "CAS ID", id: ENUM_SEARCH_BY.CasRegistryNumber, example: "15663-27-1; 14913-33-8" },
  {
    name: "MB ID",
    id: ENUM_SEARCH_BY.MbId,
    example: "MB-Pt-000005; MB-Pt-Ru-000087",
    // The ID is matched on a substring, which the other fields are not, so the
    // hint says so — a metal or a number alone is a useful group lookup.
    note: "You can also search by part of the name, e.g. Pt or 537.",
  },
];

// Tissue examples are spelled as the curated list spells them, since the field
// matches that vocabulary rather than free text ("Ovary", not "ovarian").
export const cellLineSearchByOptions: TSearchByOption[] = [
  { name: "Cell line", id: ENUM_CELL_LINE_SEARCH_BY.CellLine, example: "MCF-7; A2780" },
  // Tissues are chosen from a list rather than typed, so no worked example.
  { name: "Tissue", id: ENUM_CELL_LINE_SEARCH_BY.Tissue, placeholder: "Select tissues" },
];

interface SearchSectionProps {
  initialValue?: string;
  hasSearchField: boolean;
  className?: string;
  /** Omit to hide the field picker — an unscoped search has nothing to pick. */
  searchBy?: string;
  /** The fields on offer; defaults to the Substances set. */
  searchByOptions?: TSearchByOption[];
  /** Values to choose from when the active field is picked from a list. */
  valueOptions?: string[];
  valueOptionsLoading?: boolean;
  onSearchByChange?: (searchBy: string) => void;
  /** Omit to hide the Draw button — the drawer only makes sense for substances. */
  onDrawerClick?: () => void;
  onChange?: (queryStr: string) => void;
  onSearch: (queryStr?: string) => void;
}

export const SearchSection: FC<SearchSectionProps> = ({
  initialValue,
  hasSearchField,
  className,
  searchBy,
  searchByOptions = substanceSearchByOptions,
  valueOptions,
  valueOptionsLoading,
  onSearchByChange,
  onDrawerClick,
  onSearch,
}) => {
  const [queryStr, setQueryStr] = useState(initialValue ?? "");
  useEffect(() => {
    setQueryStr(initialValue ?? "");
  }, [initialValue]);

  const activeOption = searchByOptions.find((option) => option.id === searchBy);
  // A field whose values come from a fixed list is picked, not typed.
  const picked = !!valueOptions;
  const pickedValues = queryStr
    .split(";")
    .map((value) => value.trim())
    .filter(Boolean);

  const drawButton = onDrawerClick && (
    <Button
      type="button"
      variant="draw"
      size="draw"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDrawerClick();
      }}
    >
      Draw
      <Icon name={mdiHexagonOutline} color="white" large />
    </Button>
  );

  return (
    <div className={cn("flex w-full max-w-4xl flex-col gap-1", className)}>
      {/* The picker sits on its own row on phones — beside the field there is
          not enough width left for the input and the Draw button. */}
      <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {/* Sized to the widest label ("Cell line", 62px at 14px Roboto) plus the
            chevron and the trigger's own padding — fixed rather than w-fit so
            the control does not resize as the selection changes. */}
        {searchBy && (
          <div className="w-[108px] sm:w-[150px] sm:shrink-0">
            <Select
              value={searchBy}
              items={searchByOptions}
              hideDetails
              // Switching tabs swaps the whole item list under the Select, and
              // Radix answers that by clearing its value and reporting "". Left
              // alone it would unset the field and hide this picker entirely.
              onValueChange={(value) => value && onSearchByChange?.(value)}
            />
          </div>
        )}

        <div className="flex grow items-center gap-2">
          <div className="grow">
            {picked ? (
              <MultiSelect
                values={pickedValues}
                items={valueOptions}
                loading={valueOptionsLoading}
                placeholder={activeOption?.placeholder}
                // Joined the same way a typed query is, so the URL and the API
                // see one format whichever way the values were entered.
                onChange={(values) => setQueryStr(values.join("; "))}
              />
            ) : (
              <TextField
                value={queryStr}
                className="search-bar text-base placeholder:font-semibold"
                clearable
                hideDetails
                appendInner={drawButton}
                onChange={(e) => setQueryStr(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (queryStr || hasSearchField) onSearch(queryStr || undefined);
                  }
                }}
              />
            )}
          </div>

          {/* The drawer is about substances, not about the chosen field, so it
              stays reachable when the value dropdown replaces the input. */}
          {picked && drawButton}

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

      {!picked && activeOption?.example && (
        <p className="text-white/60 text-xs font-light text-center">
          You can enter multiple values separated by semicolon, e.g. {activeOption.example}
          {activeOption.note && `. ${activeOption.note}`}
        </p>
      )}
    </div>
  );
};
