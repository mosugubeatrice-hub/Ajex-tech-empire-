"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const threshold = window.innerHeight * 0.5

      if (scrolled > threshold && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10 max-w-sm">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-white mb-3">
          <h3 className="font-bold text-lg">Ready to 3X Your Revenue?</h3>
          <p className="text-sm opacity-90">Get your free growth audit - limited spots available</p>
        </div>

        <Link href="/contact">
          <Button
            size="sm"
            className="w-full bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Claim Your Free Audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
