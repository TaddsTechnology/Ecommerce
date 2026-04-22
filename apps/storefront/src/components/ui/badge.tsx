import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-auto w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all hover:opacity-90 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[var(--green-accent)] text-white",
        secondary: "bg-[var(--ceramic)] text-[var(--text-black)]",
        destructive: "bg-[var(--red)] text-white",
        outline: "border-[var(--green-accent)] text-[var(--green-accent)] bg-transparent",
        ghost: "bg-transparent text-[var(--text-black-soft)]",
        gold: "border-[var(--gold)] text-[var(--gold)] bg-transparent",
        success: "bg-[var(--green-light)] text-[var(--starbucks-green)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
