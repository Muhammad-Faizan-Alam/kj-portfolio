import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-[9px] border border-line bg-white px-3.5 text-[14px] text-ink placeholder:text-ink-soft/70",
        "transition-colors outline-none focus-visible:border-select focus-visible:ring-2 focus-visible:ring-select-soft",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
