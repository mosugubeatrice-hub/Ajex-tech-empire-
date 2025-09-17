"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export function WebVitalsTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Track Core Web Vitals
    const trackWebVital = (metric: any) => {
      // Send to analytics service
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", metric.name, {
          event_category: "Web Vitals",
          event_label: metric.id,
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          non_interaction: true,
        })
      }

      // Log for development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Web Vitals] ${metric.name}:`, metric.value)
      }
    }

    // Import and use web-vitals library if available
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(trackWebVital)
        getFID(trackWebVital)
        getFCP(trackWebVital)
        getLCP(trackWebVital)
        getTTFB(trackWebVital)
      })
      .catch(() => {
        // Fallback manual tracking
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === "paint") {
              trackWebVital({
                name: entry.name === "first-contentful-paint" ? "FCP" : "FP",
                value: entry.startTime,
                id: `${entry.name}-${Date.now()}`,
              })
            }
          }
        })

        observer.observe({ entryTypes: ["paint"] })
      })
  }, [])

  return null
}
