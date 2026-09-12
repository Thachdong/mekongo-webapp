"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "cn"

function Toggle({ className, ...props }: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle"
      className={cn(
        "group/toggle inline-flex w-fit items-center overflow-hidden rounded-lg border border-input bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function ToggleItem({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle-item"
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center border-r border-input px-3 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors last:border-r-0 hover:text-foreground focus-visible:relative focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 group-data-disabled/toggle:pointer-events-none group-data-disabled/toggle:opacity-50 data-pressed:bg-primary data-pressed:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Toggle, ToggleItem }
