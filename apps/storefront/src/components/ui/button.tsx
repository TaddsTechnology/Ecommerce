"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] overflow-hidden rounded-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-foreground)] text-[var(--color-white)]",
        destructive: "bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90",
        outline: "border border-[var(--color-foreground)] bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-white)]",
        secondary: "bg-[var(--color-muted-bg)] text-[var(--color-foreground)] hover:bg-[var(--color-muted-foreground)]/20",
        ghost: "hover:bg-[var(--color-muted-bg)] text-[var(--color-foreground)]",
        link: "text-[var(--color-foreground)] underline-offset-4 hover:underline h-auto p-0",
        white: "bg-white text-[var(--color-foreground)] border border-[var(--color-foreground)] hover:bg-[var(--color-foreground)] hover:text-white",
        gold: "bg-[var(--color-gold)] text-[var(--color-foreground)]",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6 text-[10px]",
        lg: "h-14 px-10",
        xl: "h-16 px-12 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantProps["variant"];
  size?: ButtonVariantProps["size"];
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const showGoldAnimation = variant === "default";
    
    const content = (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {showGoldAnimation && (
          <span 
            className="absolute inset-0 bg-[var(--color-gold)] -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:translate-x-0"
          />
        )}
        <span className="relative z-10">
          {children}
        </span>
      </button>
    );
    
    return href ? <Link href={href} className={cn(buttonVariants({ variant, size, className }))}>{content.props.children}</Link> : content;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };