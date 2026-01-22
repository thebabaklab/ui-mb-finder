import { type FC, type PropsWithChildren, useMemo, useRef, useState } from "react";

import { mdiChevronDown } from "@mdi/js";
import { Button, Icon } from "@ui-kit";
import { cn } from "@utils";

export const CollapsibleContent: FC<PropsWithChildren> = ({ children }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<number | string>(190);
  const open = useMemo(() => height !== 190, [height]);

  const handleToggle = () => {
    if (containerRef.current) {
      if (height === 190) setHeight(containerRef.current.scrollHeight);
      else setHeight(190);
    }
  };

  return (
    <div className="text-base text-white">
      <div className="font-bold text-primary mb-4">Abstract:</div>

      <p ref={containerRef} className="font-light overflow-hidden transition-all duration-300 mb-6" style={{ height }}>
        {children}
      </p>

      <Button variant="back" className="pl-6 text-base font-light pr-4 gap-6" onClick={handleToggle}>
        {open ? "Hide full text" : "Show full text"}
        <Icon
          name={mdiChevronDown}
          color="current"
          className={cn("transition-all duration-300", {
            "rotate-180": open,
          })}
          large
        />
      </Button>
    </div>
  );
};
