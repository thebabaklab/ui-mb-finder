import { type FC, type PropsWithChildren, useMemo, useRef, useState } from "react";

import { mdiChevronDown } from "@mdi/js";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";

export const CollapsibleContent: FC<PropsWithChildren> = ({ children }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<number | string>(200);
  const open = useMemo(() => height !== 200, [height]);

  const handleToggle = () => {
    if (containerRef.current) {
      if (height === 200) setHeight(containerRef.current.scrollHeight);
      else setHeight(200);
    }
  };

  return (
    <div className="px-7.5 text-sm">
      <div className="font-bold">Abstract:</div>

      <p ref={containerRef} className="overflow-hidden transition-all duration-300" style={{ height }}>
        {children}
      </p>

      <Button variant="link" className="text-secondary h-5 gap-0 p-0" onClick={handleToggle}>
        {open ? "hide full text" : "show full text"}
        <Icon
          name={mdiChevronDown}
          color="current"
          className={cn("transition-all duration-300", {
            "rotate-180": open,
          })}
          dense
        />
      </Button>
    </div>
  );
};
