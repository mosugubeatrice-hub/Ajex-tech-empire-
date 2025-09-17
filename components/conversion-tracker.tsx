"use client"

import { useEffect } from "react"
import { analytics } from "./analytics-provider"

interface ConversionTrackerProps {
  conversionType: "contact_form" | "newsletter" | "booking" | "download"
  value?: number
  metadata?: Record<string, any>
}

export function ConversionTracker({ conversionType, value, metadata }: ConversionTrackerProps) {
  useEffect(() => {
    // Track the conversion
    analytics.trackEvent("conversion", {
      conversion_type: conversionType,
      value: value,
      currency: "USD",
      ...metadata,
    })

    // Also track specific conversion events
    switch (conversionType) {
      case "contact_form":
        analytics.trackEvent("generate_lead", {
          value: value || 100, // Default lead value
          currency: "USD",
        })
        break
      case "newsletter":
        analytics.trackEvent("sign_up", {
          method: "newsletter",
        })
        break
      case "booking":
        analytics.trackEvent("begin_checkout", {
          value: value,
          currency: "USD",
        })
        break
      case "download":
        analytics.trackEvent("select_content", {
          content_type: "download",
          item_id: metadata?.fileName,
        })
        break
    }
  }, [conversionType, value, metadata])

  return null
}
