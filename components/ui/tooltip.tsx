import React, { useState } from "react"
import { cn } from "~/lib/utils"

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  if (!content) return children

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute z-[999] left-1/2 -translate-x-1/2 top-full mt-2">
          <div
            className={cn(
              "relative px-3 py-1.5 text-xs font-normal text-white bg-slate-900 dark:bg-slate-800 rounded-md shadow-md whitespace-nowrap animate-in fade-in slide-in-from-top-2 duration-150",
              className
            )}
          >
            {content}
            {/* Arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-4 border-transparent border-b-slate-900 dark:border-b-slate-800" />
          </div>
        </div>
      )}
    </div>
  )
}
