import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-button-primary-background text-button-primary-foreground shadow hover:bg-button-primary-background/90",
        icon: "rounded-full bg-button-primary-foreground text-button-primary-background hover:bg-button-primary-background/10",
        close_icon: "rounded-full hover:bg-white",
        draw: "rounded-full bg-secondary text-lg font-light text-white gap-1 hover:bg-primary",
        destructive:
          "bg-button-destructive-background text-button-destructive-foreground shadow hover:bg-button-destructive-background/90",
        outline:
          "border border-button-primary-background bg-button-primary-foreground text-button-primary-background hover:bg-button-primary-background hover:text-white",
        secondary:
          "bg-button-secondary-background text-button-secondary-foreground shadow-sm hover:bg-button-secondary-background/80",
        tertiary: "border border-button-tertiary-border text-button-tertiary-foreground",
        ghost: "bg-button-ghost-background text-button-ghost-foreground border border-button-ghost-border",
        link: "text-primary underline",
        success:
          "bg-button-success-background text-button-success-foreground shadow hover:bg-button-success-background/90",
      },
      size: {
        default: "h-12 px-8",
        icon: "h-9 w-9",
        link: "h-12",
        small: "h-10 px-8",
        xSmall: "h-8 px-4",
        draw: "h-11 px-[12px]"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
