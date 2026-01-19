import * as React from "react";

import { mdiCheckBold, mdiChevronDown, mdiChevronUp } from "@mdi/js";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@utils";

import { Icon } from "../icon";

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    open: boolean;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "placeholder:text-gunmetal font-light ring-offset-background border-border flex h-[46px] w-full items-center justify-between rounded-full border bg-platinum-silver px-4 text-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon
          name={mdiChevronDown}
          color="current"
          className={cn("opacity-50 transition-transform", props.open && "rotate-180")}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <Icon name={mdiChevronUp} color="current" className="opacity-50" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <Icon name={mdiChevronDown} color="current" className="opacity-50" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-border relative z-50 max-h-96 overflow-hidden rounded-xl border bg-white shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pr-2 pl-8 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground hover:bg-background-alt relative flex w-full cursor-pointer items-center rounded-lg py-3 pr-2 pl-3 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <span className="absolute right-4 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon name={mdiCheckBold} small color="current" className="mb-1 opacity-40" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("bg-muted -mx-1 my-1 h-px", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectRoot> {
  value?: string;
  label?: string;
  placeholder?: string;
  items?: { [key: string]: string | number }[];
  width?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  hideDetails?: boolean;
  onValueChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  value,
  label,
  placeholder,
  items,
  width,
  readOnly,
  disabled,
  error,
  errorMessage,
  hideDetails,
  onValueChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const hasError = React.useMemo(() => error || !!errorMessage, [error, errorMessage]);

  return (
    <div className="flex flex-col gap-1 text-start">
      {label && (
        <label
          className={cn(
            "text-foreground-muted cursor-pointer text-sm font-semibold select-none",
            readOnly && "pointer-events-none",
            disabled && "pointer-events-none cursor-not-allowed opacity-50"
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          {label}
        </label>
      )}

      <div className={cn("flex flex-col gap-0", hideDetails ? "h-[46px]" : "h-[62px]")}>
        <SelectRoot open={open} onOpenChange={setOpen} value={value} onValueChange={onValueChange}>
          <SelectTrigger
            open={open}
            disabled={disabled}
            style={{ width }}
            className={cn(
              readOnly && "pointer-events-none",
              hasError
                ? "border-state-destructive-foreground focus:ring-state-destructive-foreground"
                : "focus:border-primary focus:ring-ring"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent style={{ width }}>
            {items?.map((option, i) => (
              <SelectItem key={i} value={String(option.id)} className={cn({ "text-primary": value === option.id })}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {errorMessage && !hideDetails && (
          <span className="text-state-destructive-foreground text-xs">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
