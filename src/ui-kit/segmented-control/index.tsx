import type { FC } from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@utils";

interface SegmentedControlProps {
  value: string;
  items: { name: string; id: string }[];
  /** Read by screen readers in place of a visible label. */
  label: string;
  className?: string;
  onValueChange: (value: string) => void;
}

/**
 * A handful of mutually exclusive choices shown side by side as one pill,
 * the current one filled. Built on Radix's radio group, so it behaves as a
 * radio group for the keyboard (arrow keys move the choice) and for screen
 * readers — the app's own RadioGroup is styled as form radio buttons instead.
 */
export const SegmentedControl: FC<SegmentedControlProps> = ({ value, items, label, className, onValueChange }) => (
  <RadioGroupPrimitive.Root
    value={value}
    onValueChange={onValueChange}
    aria-label={label}
    orientation="horizontal"
    className={cn("border-primary/60 inline-flex rounded-full border p-0.5", className)}
  >
    {items.map((item) => (
      <RadioGroupPrimitive.Item
        key={item.id}
        value={item.id}
        className={cn(
          "focus-visible:ring-primary cursor-pointer rounded-full px-3 py-1 text-xs font-light transition-colors focus-visible:ring-1 focus-visible:outline-none",
          "text-white/70 hover:text-white",
          "data-[state=checked]:bg-primary data-[state=checked]:text-gunmetal data-[state=checked]:font-semibold"
        )}
      >
        {item.name}
      </RadioGroupPrimitive.Item>
    ))}
  </RadioGroupPrimitive.Root>
);
