import { useEffect, useState, type FC } from "react";
import { mdiHexagonOutline, mdiMagnify } from "@mdi/js";
import { Button, Icon, TextField } from "@ui-kit";
import { cn } from "@utils";

interface SearchSectionProps {
  initialValue?: string;
  hasSearchField: boolean;
  className?: string;
  onDrawerClick?: () => void;
  onChange?: (queryStr: string) => void;
  onSearch: (queryStr?: string) => void;
}

export const SearchSection: FC<SearchSectionProps> = ({
  initialValue,
  hasSearchField,
  className,
  onDrawerClick,
  onSearch,
}) => {
  const [queryStr, setQueryStr] = useState(initialValue ?? "");
  useEffect(() => {
    setQueryStr(initialValue ?? "");
  }, [initialValue]);

  return (
    <div className={cn("flex items-center w-full gap-2 max-w-4xl", className)}>
      <div
        className="grow"
      // onSubmit={(e) => {
      //   e.preventDefault();

      //   if (queryStr)
      //     onSearch(queryStr || undefined);
      // }}
      >
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
  );
};
