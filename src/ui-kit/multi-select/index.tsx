import { type FC, useEffect, useRef, useState } from "react";

import { mdiChevronDown } from "@mdi/js";
import { cn } from "@utils";

import { Checkbox } from "../checkbox";
import { Icon } from "../icon";

interface MultiSelectProps {
  values: string[];
  items: string[];
  placeholder?: string;
  loading?: boolean;
  className?: string;
  onChange: (values: string[]) => void;
  /** Called when the panel closes with a different selection than it opened with. */
  onCommit?: (values: string[]) => void;
}

/** How many picked values the closed field names before counting the rest. */
const SHOWN = 3;

/**
 * A closed list of values, several of which may be picked at once. Radix's
 * Select is single-choice only and the project has no popover primitive, so
 * this is a plain button and panel with the app's own Checkbox inside.
 */
export const MultiSelect: FC<MultiSelectProps> = ({
  values,
  items,
  placeholder = "Select",
  loading,
  className,
  onChange,
  onCommit,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // The selection when the panel opened, to tell on closing whether anything
  // changed. The latest values and callback sit in refs because the listeners
  // below are attached once per opening and would otherwise see stale ones.
  const openedWith = useRef<string[]>(values);
  const latest = useRef({ values, onCommit });
  latest.current = { values, onCommit };

  const close = () => {
    setOpen(false);

    const { values: now, onCommit: commit } = latest.current;
    const before = openedWith.current;
    if (now.length !== before.length || now.some((value) => !before.includes(value))) commit?.(now);
  };

  // The panel is not in a portal, so a click anywhere else closes it.
  useEffect(() => {
    if (!open) return;

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

  const toggle = (item: string, checked: boolean) => {
    onChange(checked ? [...values, item] : values.filter((value) => value !== item));
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        className="border-border flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-full border bg-platinum-silver px-4 text-left text-base text-gunmetal"
        onClick={() => {
          if (open) return close();
          openedWith.current = values;
          setOpen(true);
        }}
      >
        {/* Past a few values the names stop fitting on one line, so the rest
            become a count; the panel's checkboxes show which they are. */}
        <span
          className={cn("min-w-0 truncate font-light", !values.length && "opacity-60")}
          title={values.length > SHOWN ? values.join(", ") : undefined}
        >
          {!values.length
            ? placeholder
            : values.length > SHOWN
              ? `${values.slice(0, SHOWN).join(", ")} +${values.length - SHOWN} more`
              : values.join(", ")}
        </span>
        <Icon
          name={mdiChevronDown}
          color="current"
          className={cn("shrink-0 opacity-50 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Checkbox labels default to the light-on-dark colour used in the
          sidebar; this panel is white like the field picker's, so they are
          recoloured here rather than adding a prop to Checkbox. */}
      {open && (
        <div className="border-border absolute z-50 mt-1 max-h-72 w-full overflow-y-auto rounded-xl border bg-white p-2 shadow-md [&_label]:text-gunmetal">
          {loading ? (
            <p className="px-2 py-3 text-sm text-gunmetal/60">Loading…</p>
          ) : items.length ? (
            items.map((item) => (
              <div key={item} className="px-2 py-1.5">
                <Checkbox
                  label={item}
                  checked={values.includes(item)}
                  onCheckedChange={(checked) => toggle(item, !!checked)}
                />
              </div>
            ))
          ) : (
            <p className="px-2 py-3 text-sm text-gunmetal/60">Nothing to choose from</p>
          )}
        </div>
      )}
    </div>
  );
};
