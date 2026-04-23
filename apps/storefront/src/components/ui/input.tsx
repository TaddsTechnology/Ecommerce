import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 border-b border-[var(--color-foreground)]/30 bg-transparent px-0 py-2 text-base transition-all duration-500 ease-out outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-[var(--font-display)] placeholder:italic placeholder:text-[var(--color-muted)] focus:border-b-2 focus:border-[var(--color-gold)] focus:placeholder:text-[var(--color-muted)]/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--color-error)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }