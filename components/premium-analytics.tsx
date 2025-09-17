"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export function PremiumAnalytics() {
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("config", "GA_MEASUREMENT_ID", {
          page_title: document.title,
          page_location: window.location.href,
        })
      }
    }

    // Track scroll depth
    const trackScrollDepth = () => {
      const scrollDepths = [25, 50, 75, 100]
      let maxScroll = 0

      const handleScroll = () => {
        const scrollTop = window.pageYOffset
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = Math.round((scrollTop / docHeight) * 100)

        scrollDepths.forEach((depth) => {
          if (scrollPercent >= depth && maxScroll < depth) {
            maxScroll = depth
            if (typeof window.gtag !== "undefined") {
              window.gtag("event", "scroll_depth", {
                event_category: "engagement",
                event_label: `${depth}%`,
                value: depth,
              })
            }
          }
        })
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }

    // Track time on page
    const trackTimeOnPage = () => {
      const startTime = Date.now()

      const handleBeforeUnload = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000)
        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "time_on_page", {
            event_category: "engagement",
            event_label: "seconds",
            value: timeSpent,
          })
        }
      }

      window.addEventListener("beforeunload", handleBeforeUnload)
      return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }

    trackPageView()
    const cleanupScroll = trackScrollDepth()
    const cleanupTime = trackTimeOnPage()

    return () => {
      cleanupScroll()
      cleanupTime()
    }
  }, [])

  return null
}
