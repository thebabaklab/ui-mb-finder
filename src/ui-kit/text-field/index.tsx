import { type ComponentProps, forwardRef, type ReactNode, useMemo, useRef } from "react";

import { mdiCloseCircle } from "@mdi/js";
import { cn } from "@utils";

import { Icon } from "../icon";

interface TextFieldProps extends ComponentProps<"input"> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  hideDetails?: boolean;
  clearable?: boolean;
  dense?: boolean;
  shaped?: "left" | "right";
  full_p?: true | false;
  prependInner?: ReactNode;
  appendInner?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      type,
      label,
      error,
      errorMessage,
      hideDetails,
      clearable,
      dense,
      shaped,
      full_p,
      prependInner,
      appendInner,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasError = useMemo(() => error || !!errorMessage, [error, errorMessage]);

    const handleContainerClick = () => {
      if (containerRef.current) {
        const input = containerRef.current.querySelector("input") as HTMLInputElement;
        input.focus();
        if (input.type !== "number") {
          setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        }
      }
    };

    const handleClear = () => {
      if (containerRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;

        const input = containerRef.current.querySelector("input") as HTMLInputElement;

        if (input && nativeInputValueSetter) {
          nativeInputValueSetter.call(input, "");
          const event = new Event("input", { bubbles: true });
          input.dispatchEvent(event);
        }
      }
    };

    return (
      <div className="flex flex-col gap-1 text-start">
        {label && (
          <label
            htmlFor={label}
            className={cn(
              "text-foreground-muted cursor-pointer text-sm font-semibold select-none",
              props.disabled && "cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}

        <div className={cn("flex flex-col gap-0", !hideDetails && "min-h-[62px]")}>
          <div
            ref={containerRef}
            className={cn(
              "bg-platinum-silver focus-within:ring-ring border-border flex w-full cursor-text items-center rounded-full border pl-4 transition-colors focus-within:ring-1",
              shaped === "left" && "rounded-l-none",
              shaped === "right" && "rounded-r-none",
              props.disabled && "cursor-not-allowed",
              dense ? "h-10" : "h-[46px]",
              full_p ? "pr-4" : "",
              hasError
                ? "border-error focus-within:ring-error"
                : "focus-within:border-secondary focus-within:ring-secondary focus-within:text-secondary"
            )}
            onClick={handleContainerClick}
          >
            {prependInner && prependInner}

            <input
              ref={ref}
              id={label}
              type={type}
              className={cn(
                "bg-platinum-silver text-foreground placeholder:text-foreground-muted-more disabled:text-foreground-muted-more h-full w-full rounded-xl text-sm focus-visible:outline-none disabled:cursor-not-allowed",
                className
              )}
              onClick={(e) => e.stopPropagation()}
              {...props}
            />

            {clearable && props.value && (
              <Icon name={mdiCloseCircle} className="cursor-pointer" color="current" onClick={handleClear} />
            )}

            {appendInner && appendInner}
          </div>

          {errorMessage && <span className="text-state-destructive-foreground text-xs">{errorMessage}</span>}
        </div>
      </div>
    );
  }
);
TextField.displayName = "TextField";

export { TextField };
