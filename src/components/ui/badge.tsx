import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded font-mono text-[10.5px] font-medium px-2 py-1 w-fit whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-canvas-2 text-ink-soft",
        select: "bg-select-soft text-select",
        outline: "border border-line text-ink-soft bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
