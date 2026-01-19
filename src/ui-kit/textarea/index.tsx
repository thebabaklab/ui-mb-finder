import { type ComponentProps, forwardRef, useMemo } from "react";

import { cn } from "@utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  hideDetails?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, errorMessage, ...props }, ref) => {
    const hasError = useMemo(() => error || !!errorMessage, [error, errorMessage]);

    return (
      <div className="flex w-full flex-col gap-1 text-start">
        {label && (
          <label
            htmlFor={label}
            className={cn(
              "text-foreground-muted cursor-pointer text-sm font-semibold select-none",
              props.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={label}
          className={cn(
            "border-input placeholder:text-muted-foreground flex min-h-[60px] rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            hasError ? "border-error focus-within:ring-error" : "focus-visible:border-ring focus-visible:ring-ring",
            className
          )}
          {...props}
        />

        {errorMessage && <span className="text-error text-xs">{errorMessage}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
