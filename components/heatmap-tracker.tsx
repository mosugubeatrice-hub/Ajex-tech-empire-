"use client"

import { useEffect } from "react"

export function HeatmapTracker() {
  useEffect(() => {
    // Initialize Hotjar (replace with your Hotjar ID)
    if (typeof window !== "undefined") {
      ;((h: any, o: any, t: any, j: any, a?: any, r?: any) => {
        h.hj =
          h.hj ||
          (() => {
            ;(h.hj.q = h.hj.q || []).push(arguments)
          })
        h._hjSettings = { hjid: "YOUR_HOTJAR_ID", hjsv: 6 }
        a = o.getElementsByTagName("head")[0]
        r = o.createElement("script")
        r.async = 1
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
        a.appendChild(r)
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=")
    }
  }, [])

  return null
}
