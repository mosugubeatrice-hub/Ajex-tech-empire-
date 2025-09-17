"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
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
    preloadResource("/fonts/inter.woff2", "font", "font/woff2")
    preloadResource("/fonts/poppins.woff2", "font", "font/woff2")

    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll("img[data-lazy]")
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

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Delay non-critical scripts
      setTimeout(() => {
        // Load analytics after initial page load
        if (typeof window !== "undefined" && !window.gtag) {
          const script = document.createElement("script")
          script.async = true
          script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          document.head.appendChild(script)
        }
      }, 3000)
    }

    // Run optimizations after page load
    if (document.readyState === "complete") {
      optimizeThirdPartyScripts()
    } else {
      window.addEventListener("load", optimizeThirdPartyScripts)
    }

    // Cleanup
    return () => {
      imageObserver.disconnect()
    }
  }, [])

  return null
}
