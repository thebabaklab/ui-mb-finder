import type { FC, PropsWithChildren } from "react";

import { cn } from "@utils";

interface AppContainerProps {
  className?: string;
}

export const AppContainer: FC<PropsWithChildren<AppContainerProps>> = ({ children, className }) => {
  // return <div className={cn("mx-auto max-w-[1284px] min-w-[375px] px-5 sm:px-8", className)}>{children}</div>;
  return <div className={cn("px-5 sm:px-25", className)}>{children}</div>;
};
