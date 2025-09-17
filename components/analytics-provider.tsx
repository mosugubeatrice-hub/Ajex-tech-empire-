"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      window.gtag("js", new Date())

      // Use environment-specific GA ID
      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID"
      window.gtag("config", gaId, {
        page_path: pathname,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      })
    }
  }, [])

  useEffect(() => {
    // Track page views with enhanced data
    if (typeof window !== "undefined" && window.gtag) {
      const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID"
      window.gtag("config", gaId, {
        page_path: pathname,
        page_title: document.title,
        custom_map: {
          dimension1: "page_category",
          dimension2: "user_type",
        },
      })
    }
  }, [pathname])

  return <>{children}</>
}

// Analytics utility functions
export const analytics = {
  // Track custom events
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, parameters)
    }
  },

  // Track conversions
  trackConversion: (conversionId: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: conversionId,
        value: value,
        currency: "USD",
      })
    }
  },

  // Track form submissions
  trackFormSubmission: (formName: string, formData?: Record<string, any>) => {
    analytics.trackEvent("form_submit", {
      form_name: formName,
      ...formData,
    })
  },

  // Track button clicks
  trackButtonClick: (buttonName: string, location?: string) => {
    analytics.trackEvent("button_click", {
      button_name: buttonName,
      location: location,
    })
  },

  // Track scroll depth
  trackScrollDepth: (depth: number) => {
    analytics.trackEvent("scroll_depth", {
      depth_percentage: depth,
    })
  },

  // Track time on page
  trackTimeOnPage: (timeInSeconds: number) => {
    analytics.trackEvent("time_on_page", {
      time_seconds: timeInSeconds,
    })
  },

  // Track downloads
  trackDownload: (fileName: string, fileType?: string) => {
    analytics.trackEvent("file_download", {
      file_name: fileName,
      file_type: fileType,
    })
  },

  // Track external link clicks
  trackExternalLink: (url: string) => {
    analytics.trackEvent("external_link_click", {
      link_url: url,
    })
  },
}
