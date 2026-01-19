import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@utils";
import { type VariantProps } from "class-variance-authority";

import { ProgressCircular } from "../progress-circular";
import { buttonVariants } from "./button.style";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <ProgressCircular indeterminate size={20} /> : props.children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
