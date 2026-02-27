"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Use requestIdleCallback or defer to microtask to avoid React conflicts
    const optimizePerformance = () => {
      // Preload critical resources
      const preloadResource = (href: string, as: string, type?: string) => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.href = href
        link.as = as
        if (type) link.type = type
        document.head.appendChild(link)
      }

      // Preload critical fonts
      Promise.resolve().then(() => {
        preloadResource("/fonts/inter.woff2", "font", "font/woff2")
        preloadResource("/fonts/poppins.woff2", "font", "font/woff2")
      })

      // Lazy load non-critical images
      const lazyImages = document.querySelectorAll("img[data-lazy]")
      if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.lazy || ""
              img.classList.remove("lazy")
              imageObserver.unobserve(img)
            }
          })
        })

        lazyImages.forEach((img) => imageObserver.observe(img))
      }

      // Defer analytics script loading to after initial render
      if (document.readyState === "complete") {
        Promise.resolve().then(() => {
          setTimeout(() => {
            if (typeof window !== "undefined" && !(window as any).gtag) {
              const script = document.createElement("script")
              script.async = true
              script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
              document.head.appendChild(script)
            }
          }, 3000)
        })
      } else {
        window.addEventListener("load", () => {
          Promise.resolve().then(() => {
            setTimeout(() => {
              if (typeof window !== "undefined" && !(window as any).gtag) {
                const script = document.createElement("script")
                script.async = true
                script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                document.head.appendChild(script)
              }
            }, 3000)
          })
        })
      }
    }

    optimizePerformance()
  }, [])

  return null
}
