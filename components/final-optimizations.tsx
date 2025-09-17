"use client"

import { useEffect } from "react"

export function FinalOptimizations() {
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover")
    }

    const themeColorMeta = document.createElement("meta")
    themeColorMeta.name = "theme-color"
    themeColorMeta.content = "#0066ff"
    document.head.appendChild(themeColorMeta)

    const appleTouchIcon = document.createElement("link")
    appleTouchIcon.rel = "apple-touch-icon"
    appleTouchIcon.href = "/ajex-logo.jpg"
    document.head.appendChild(appleTouchIcon)

    document.documentElement.style.scrollBehavior = "smooth"

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add("reduce-motion")
    }

    const prefersHighContrast = window.matchMedia("(prefers-contrast: high)")
    if (prefersHighContrast.matches) {
      document.documentElement.classList.add("high-contrast")
    }

    let focusedElementBeforeModal: HTMLElement | null = null

    const handleModalOpen = () => {
      focusedElementBeforeModal = document.activeElement as HTMLElement
    }

    const handleModalClose = () => {
      if (focusedElementBeforeModal) {
        focusedElementBeforeModal.focus()
      }
    }

    document.addEventListener("modal-open", handleModalOpen)
    document.addEventListener("modal-close", handleModalClose)

    return () => {
      document.removeEventListener("modal-open", handleModalOpen)
      document.removeEventListener("modal-close", handleModalClose)
    }
  }, [])

  return null
}
