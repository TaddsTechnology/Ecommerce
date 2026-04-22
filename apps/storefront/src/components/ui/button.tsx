"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[30px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary)] text-white hover:opacity-90",
        destructive: "bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90",
        outline: "border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-grey-200)]",
        secondary: "bg-[var(--color-grey-100)] text-[var(--color-text-primary)] hover:bg-[var(--color-grey-200)]",
        ghost: "hover:bg-[var(--color-grey-100)] text-[var(--color-text-primary)]",
        link: "text-[var(--color-link)] underline-offset-4 hover:underline h-auto p-0",
        white: "bg-white text-[var(--color-primary)] border border-white hover:bg-[var(--color-grey-100)]",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
