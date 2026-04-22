"use client";

import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  borderRadius = "30px",
  shimmerDuration = "3s",
  background = "rgba(17, 17, 17, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-[30px] border border-white/10 px-8 py-4 whitespace-nowrap text-white transition-transform duration-300 active:scale-[0.98]",
        "bg-[var(--color-primary)]",
        className
      )}
      {...props}
    >
      {/* Spark container */}
      <div className="absolute inset-0 overflow-visible -z-30 blur-[2px]">
        <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-full rounded-none">
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around bg-[conic-gradient(from_270deg,transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {children}
      
      {/* Highlight */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
    </button>
  );
}