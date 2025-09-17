"use client"

import { useEffect, useState } from "react"

export function PremiumCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      setIsPointer(
        target.tagName.toLowerCase() === "button" ||
          target.tagName.toLowerCase() === "a" ||
          target.classList.contains("cursor-pointer") ||
          window.getComputedStyle(target).cursor === "pointer",
      )
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener("mousemove", updateCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 transition-all duration-150 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isPointer ? "scale-150" : "scale-100"}`}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      />
      <div
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary/30 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isPointer ? "scale-200" : "scale-100"}`}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        }}
      />
    </>
  )
}
