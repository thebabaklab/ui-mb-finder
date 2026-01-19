import type { FC, PropsWithChildren } from "react";

import { useCountUp } from "@hooks";
import clsx from "clsx";

interface StatHexagonProps {
  value: number;
  name: string;
  className?: string;
}

export const StatHexagon: FC<PropsWithChildren<StatHexagonProps>> = ({ value, name, className }) => {
  const displayValue = useCountUp(value);

  return (
    <div
      className={clsx(
        "flex h-[110px] w-[110px] cursor-pointer items-center justify-center border font-bold text-white sm:h-[120px] sm:w-[120px]",
        className
      )}
      style={{
        clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%)",
      }}
    >
      <div className="mb-1 text-center text-sm">
        <div>{displayValue}</div>
        <div>{name}</div>
      </div>
    </div>
  );
};
