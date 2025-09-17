"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: string
  label: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, label, duration = 2000, className }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          animateValue()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const animateValue = () => {
    const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
    const suffix = value.replace(/[\d.]/g, "")

    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = numericValue * easeOutQuart

      setDisplayValue(currentValue.toFixed(1).replace(".0", "") + suffix)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div
      ref={ref}
      className={cn(
        "text-center transition-all duration-500",
        isVisible && "animate-in slide-in-from-bottom-4",
        className,
      )}
    >
      <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 font-mono">{displayValue}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}
