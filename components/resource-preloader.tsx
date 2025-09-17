"use client"

import { useEffect } from "react"

const CRITICAL_RESOURCES = ["/hero-background.jpg", "/team-photo.jpg", "/portfolio-preview.jpg"]

export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical images
    CRITICAL_RESOURCES.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })

    // Preload critical fonts
    const fontPreloads = [
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap",
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
    ]

    fontPreloads.forEach((href) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "style"
      link.href = href
      document.head.appendChild(link)
    })

    // Prefetch likely next pages
    const prefetchPages = ["/services", "/portfolio", "/contact", "/about"]

    prefetchPages.forEach((href) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = href
      document.head.appendChild(link)
    })
  }, [])

  return null
}
