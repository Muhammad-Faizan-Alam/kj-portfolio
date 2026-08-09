"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>
) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-11 w-full items-center justify-between gap-2 rounded-[9px] border border-line bg-white px-3.5 text-[14px] text-ink",
        "transition-colors outline-none focus-visible:border-select focus-visible:ring-2 focus-visible:ring-select-soft",
        "data-[placeholder]:text-ink-soft/70",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown size={15} className="text-ink-soft shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "z-50 max-h-64 min-w-[8rem] overflow-hidden rounded-[9px] border border-line bg-white shadow-[0_16px_36px_-16px_rgba(18,20,28,0.25)]",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 w-[var(--radix-select-trigger-width)]",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center rounded-md py-2 pl-3 pr-8 text-[13.5px] text-ink outline-none select-none",
        "data-[highlighted]:bg-canvas-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2.5 flex items-center">
        <Check size={14} className="text-select" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
