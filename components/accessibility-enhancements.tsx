"use client"

import { useEffect } from "react"

export function AccessibilityEnhancements() {
  useEffect(() => {
    // Add skip to main content link
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.className = "skip-to-content"
    skipLink.textContent = "Skip to main content"
    skipLink.setAttribute("aria-label", "Skip to main content")
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Add main content landmark
    const main = document.querySelector("main")
    if (main) {
      main.id = "main-content"
      main.setAttribute("role", "main")
    }

    // Enhance keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modals/dropdowns
      if (e.key === "Escape") {
        const openElements = document.querySelectorAll("[data-state='open']")
        openElements.forEach((el) => {
          const closeButton = el.querySelector("[aria-label*='close'], [aria-label*='Close']")
          if (closeButton instanceof HTMLElement) {
            closeButton.click()
          }
        })
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Announce page changes for screen readers
    const announcePageChange = () => {
      const announcement = document.createElement("div")
      announcement.setAttribute("aria-live", "polite")
      announcement.setAttribute("aria-atomic", "true")
      announcement.className = "sr-only"
      announcement.textContent = `Page loaded: ${document.title}`
      document.body.appendChild(announcement)

      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }

    announcePageChange()

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return null
}
