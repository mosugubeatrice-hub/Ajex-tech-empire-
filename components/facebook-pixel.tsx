"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    fbq: (...args: any[]) => void
    _fbq: any
  }
}

export function FacebookPixel() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Facebook Pixel
      window.fbq =
        window.fbq ||
        (() => {
          ;(window.fbq.q = window.fbq.q || []).push(arguments)
        })
      if (!window._fbq) window._fbq = window.fbq
      window.fbq.push = window.fbq
      window.fbq.loaded = true
      window.fbq.version = "2.0"
      window.fbq.queue = []

      // Replace 'YOUR_PIXEL_ID' with actual Facebook Pixel ID
      window.fbq("init", "YOUR_PIXEL_ID")
      window.fbq("track", "PageView")
    }
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname])

  return null
}

// Facebook Pixel utility functions
export const facebookPixel = {
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, parameters)
    }
  },

  trackCustomEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", eventName, parameters)
    }
  },

  trackPurchase: (value: number, currency = "USD") => {
    facebookPixel.trackEvent("Purchase", {
      value: value,
      currency: currency,
    })
  },

  trackLead: () => {
    facebookPixel.trackEvent("Lead")
  },

  trackCompleteRegistration: () => {
    facebookPixel.trackEvent("CompleteRegistration")
  },
}
