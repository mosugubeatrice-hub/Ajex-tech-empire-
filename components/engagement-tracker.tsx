"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { analytics } from "./analytics-provider"

export function EngagementTracker() {
  const startTime = useRef<number>(Date.now())
  const pathname = usePathname()

  useEffect(() => {
    startTime.current = Date.now()

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      analytics.trackTimeOnPage(timeSpent)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
        analytics.trackTimeOnPage(timeSpent)
      } else {
        startTime.current = Date.now()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [pathname])

  return null
}
