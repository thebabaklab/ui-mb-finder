import { type FC, type PropsWithChildren, type ReactNode, useEffect, useState } from "react";

import { mdiChevronDown, mdiClose } from "@mdi/js";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Icon } from "@ui-kit";
import { cn } from "@utils";

interface SearchFilterProps {
  name: string | ReactNode;
  defaultOpen?: boolean;
  onRemove?: () => void;
}

export const SearchFilter: FC<PropsWithChildren<SearchFilterProps>> = ({ name, children, defaultOpen = false, onRemove }) => {
  const [defaultOpened, setDefaultOpened] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (defaultOpen && !defaultOpened) {
      setDefaultOpened(true);
      setOpen(defaultOpen);
    }
  }, [defaultOpen, defaultOpened]);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
      <CollapsibleTrigger className="w-full">
        <span
          className={cn(
            "relative text-primary inline-flex h-full w-full cursor-pointer gap-2 p-3 whitespace-nowrap transition-all duration-300"
          )}
        >
          <span className="font-light">{name}</span>

          {onRemove && (
            <Icon
              name={mdiClose}
              color="current"
              className="absolute right-12 md:right-0"
              onClick={onRemove}
            />
          )}

          <Icon
            name={mdiChevronDown}
            size={28}
            color="current"
            className="absolute right-0 lg:-right-14 transition-transform group-data-[state=open]/collapsible:rotate-180"
          />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-5 px-3 py-2">{children}</CollapsibleContent>
    </Collapsible>
  );
};
