import { type FC, useEffect, useMemo, useRef, useState } from "react";

import { mdiCheck, mdiChevronDown, mdiMagnify } from "@mdi/js";
import type { TBioDataPaper } from "@types";
import { Icon } from "@ui-kit";
import { cn } from "@utils";

interface PaperPickerProps {
  papers: TBioDataPaper[];
  /** The picked paper's id, or undefined for all papers. */
  value?: string;
  loading?: boolean;
  onChange: (paperId: string | undefined) => void;
}

const paperLabel = (paper: TBioDataPaper) => (paper.year ? `${paper.title} (${paper.year})` : paper.title);

/**
 * Narrows a substance's bio data to one of the papers it comes from. A common
 * substance spans hundreds of papers, so the panel has a search box that matches
 * title, year or DOI. Built like MultiSelect: a button and a panel, no portal.
 */
export const PaperPicker: FC<PaperPickerProps> = ({ papers, value, loading, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = papers.find((paper) => String(paper.id) === value);
  const totalCount = papers.reduce((sum, paper) => sum + paper.bioDataCount, 0);

  const shown = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return papers;

    return papers.filter((paper) => {
      const haystack = `${paper.title} ${paper.year ?? ""} ${paper.doi ?? ""}`.toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [papers, query]);

  // Every way of closing clears the search, so the panel reopens on the full list.
  const close = () => {
    setOpen(false);
    setQuery("");
  };

  // The panel is not in a portal, so a click anywhere else closes it.
  useEffect(() => {
    if (!open) return;

    searchRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const pick = (paperId: string | undefined) => {
    close();
    if (paperId !== value) onChange(paperId);
  };

  const rowClass = "flex w-full cursor-pointer items-start gap-2 rounded-lg px-2 py-2 text-left text-gunmetal hover:bg-platinum-silver";

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <button
        type="button"
        className="border-border flex min-h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-3xl border bg-platinum-silver px-4 py-2 text-left text-base text-gunmetal"
        onClick={() => (open ? close() : setOpen(true))}
      >
        <span className="line-clamp-2 min-w-0 font-light">
          {loading
            ? "Loading papers…"
            : selected
              ? paperLabel(selected)
              : value
                ? "One paper"
                : `All papers (${papers.length})`}
        </span>
        <Icon
          name={mdiChevronDown}
          color="current"
          className={cn("shrink-0 opacity-50 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="border-border absolute z-50 mt-1 w-full rounded-xl border bg-white p-2 shadow-md">
          <label className="border-border mb-2 flex items-center gap-2 rounded-full border px-3">
            <Icon name={mdiMagnify} color="current" dense className="shrink-0 text-gunmetal/50" />
            <input
              ref={searchRef}
              value={query}
              placeholder="Search by title, year or DOI"
              className="h-10 w-full bg-transparent text-base font-light text-gunmetal outline-none"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="max-h-80 overflow-x-hidden overflow-y-auto">
            {loading ? (
              <p className="px-2 py-3 text-sm text-gunmetal/60">Loading…</p>
            ) : (
              <>
                {!query.trim() && (
                  <button type="button" className={cn(rowClass, "border-border mb-1 border-b font-semibold")} onClick={() => pick(undefined)}>
                    <Icon name={mdiCheck} color="current" dense className={cn("shrink-0", value && "invisible")} />
                    <span className="flex-1">All papers</span>
                    <span className="shrink-0 text-sm font-light text-gunmetal/60">{totalCount}</span>
                  </button>
                )}

                {shown.length ? (
                  shown.map((paper) => (
                    <button key={paper.id} type="button" className={rowClass} onClick={() => pick(String(paper.id))}>
                      <Icon
                        name={mdiCheck}
                        color="current"
                        dense
                        className={cn("shrink-0", String(paper.id) !== value && "invisible")}
                      />
                      <span className="min-w-0 flex-1 break-words font-light">
                        {paper.title}
                        {paper.year && <span className="text-gunmetal/60"> ({paper.year})</span>}
                      </span>
                      <span className="shrink-0 text-sm font-light text-gunmetal/60" title="Measurements">
                        {paper.bioDataCount}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="px-2 py-3 text-sm text-gunmetal/60">No papers match</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
