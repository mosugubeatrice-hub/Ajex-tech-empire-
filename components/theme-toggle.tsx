"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className={cn("h-9 w-9 px-0", className)} disabled>
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "h-9 w-9 px-0 hover:bg-primary/10 transition-all duration-300 group relative overflow-hidden",
        className,
      )}
    >
      <div className="relative">
        <Icons.Sun
          className={cn(
            "h-4 w-4 transition-all duration-500 group-hover:text-primary",
            theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100",
          )}
        />
        <Icons.Moon
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-500 group-hover:text-primary",
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0",
          )}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
