import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value: number
    max: number
  }
>(({ className, value, max, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value as number}
    max={max}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
   <ProgressPrimitive.Indicator
  className="h-full w-full flex-1 transition-all"
  style={{
    backgroundColor: value >= 1 && value <= 3 ? 'green' : value >= 4 && value <= 6 ? 'yellow' : 'red',
    transform: `translateX(-${
      100 - Math.min(100, ((value || 0) / (max || 100)) * 100)
    }%)`,
  }}
/>
</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }