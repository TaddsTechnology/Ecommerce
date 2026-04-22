"use client";

import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
  dotSize?: number;
  dotColor?: string;
  fade?: number;
}

export function BackgroundGrid({
  className,
  dotSize = 1,
  dotColor = "rgba(17, 17, 17, 0.1)",
  fade = 8,
}: BackgroundGridProps) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        backgroundSize: `${4 * dotSize}rem ${4 * dotSize}rem`,
        maskImage: `radial-gradient(m ${fade}rem at 50% 50%, black, transparent)`,
        backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
      }}
    />
  );
}