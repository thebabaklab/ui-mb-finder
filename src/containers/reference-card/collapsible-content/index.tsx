import { type FC, type PropsWithChildren, useMemo, useRef, useState } from "react";

import { mdiChevronDown } from "@mdi/js";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";

export const CollapsibleContent: FC<PropsWithChildren> = ({ children }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<number | string>(28);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const open = useMemo(() => height !== 28, [height]);

  const handleToggle = () => {
    if (containerRef.current) {
      if (height === 28) {
        setCollapsed(false);
        containerRef.current.classList.remove("truncate")
        setHeight(containerRef.current.scrollHeight);
      }
      else {
        setCollapsed(true);
        containerRef.current.classList.add("truncate")
        setHeight(28);
      }
    }
  };

  return (
    <div className="text-base text-white">
      <div className="font-bold text-primary mb-4">Abstract:</div>

      <p ref={containerRef} className="md:max-w-[500px] lg:max-w-[400px] xl:max-w-[850px] font-light truncate overflow-hidden text-ellipsis transition-all duration-300 mb-6" style={{ height }}>
        {children}
      </p>

      <Button variant="back" className="pl-6 text-base font-light pr-4 gap-6" onClick={handleToggle}>
        {!collapsed ? "Hide full text" : "Show full text"}
        <Icon
          name={mdiChevronDown}
          color="current"
          className={cn("transition-all duration-300", {
            "rotate-180": !collapsed,
          })}
          large
        />
      </Button>
    </div>
  );
};
