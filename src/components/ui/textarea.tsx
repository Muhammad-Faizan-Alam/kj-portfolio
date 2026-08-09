import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-[9px] border border-line bg-white px-3.5 py-3 text-[14px] text-ink placeholder:text-ink-soft/70 resize-none",
        "transition-colors outline-none focus-visible:border-select focus-visible:ring-2 focus-visible:ring-select-soft",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
