import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

import { mdiCircle } from "@mdi/js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@utils";

import { Icon } from "../icon";

interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  readOnly?: boolean;
  reversed?: boolean;
  justifyType?: string;
}

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, readOnly, reversed, justifyType, ...props }, ref) => (
    <div
      className={cn(
        "flex items-center gap-2",
        !readOnly && "cursor-pointer",
        reversed ? "flex-row-reverse" : "",
        justifyType ? justifyType : "",
        props.disabled && "cursor-not-allowed opacity-50"
      )}
      onClick={
        readOnly
          ? undefined
          : (e) => {
              if (e.currentTarget === e.target) (e.currentTarget.children[0] as HTMLButtonElement).click();
            }
      }
    >
      <CheckboxPrimitive.Root
        ref={ref}
        id={label}
        className={cn(
          "peer bg-platinum-silver focus-visible:ring-primary data-[state=checked]:border-platinum-silver data-[state=checked]:text-primary border-border ring-primary h-5 w-5 shrink-0 cursor-pointer rounded-sm border-2 shadow focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          readOnly && "pointer-events-none cursor-default",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-platinum-silver")}>
          <Icon name={mdiCircle} small color="gunmetal" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <label
          htmlFor={label}
          className={cn(
            "text-platinum-silver text-sm font-light select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            !readOnly && "cursor-pointer"
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
