import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Colors {
  transparent: "text-transparent";
  current: "text-currentColor";
  primary: "text-primary";
  secondary: "text-secondary";
  gunmetal: "text-gunmetal";
  white: "text-white";
  "foreground-muted": "text-foreground-muted";
  "foreground-muted-more": "text-foreground-muted-more";
  "state-success-foreground": "text-state-success-foreground";
  "state-warning-foreground": "text-state-warning-foreground";
  "state-destructive-foreground": "text-state-destructive-foreground";
}

export const colors: Colors = {
  transparent: "text-transparent",
  current: "text-currentColor",
  primary: "text-primary",
  secondary: "text-secondary",
  gunmetal: "text-gunmetal",
  white: "text-white",
  "foreground-muted": "text-foreground-muted",
  "foreground-muted-more": "text-foreground-muted-more",
  "state-success-foreground": "text-state-success-foreground",
  "state-warning-foreground": "text-state-warning-foreground",
  "state-destructive-foreground": "text-state-destructive-foreground",
};
