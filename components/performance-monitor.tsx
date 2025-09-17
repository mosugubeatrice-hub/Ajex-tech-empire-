"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType("paint")

        const fcp = paint.find((entry) => entry.name === "first-contentful-paint")

        setMetrics({
          loadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
          firstContentfulPaint: fcp ? Math.round(fcp.startTime) : 0,
        })
      }
    }

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
    }

    // Show metrics on key combination (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        setShowMetrics((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("load", measurePerformance)
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  if (!showMetrics || !metrics) return null

  return (
    <div className="fixed bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs font-mono z-50 shadow-lg">
      <div className="text-primary font-semibold mb-2">Performance Metrics</div>
      <div className="space-y-1 text-muted-foreground">
        <div>Load: {metrics.loadTime}ms</div>
        <div>DOM: {metrics.domContentLoaded}ms</div>
        <div>FCP: {metrics.firstContentfulPaint}ms</div>
      </div>
      <div className="text-xs text-muted-foreground/60 mt-2">Press Ctrl+Shift+P to toggle</div>
    </div>
  )
}
