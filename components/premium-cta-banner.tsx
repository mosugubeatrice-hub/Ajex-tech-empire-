"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface PremiumCTABannerProps {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  variant?: "default" | "dark" | "gradient"
}

export function PremiumCTABanner({
  title = "Ready to Transform Your Digital Presence?",
  subtitle = "Join 500+ ambitious brands that have achieved measurable growth with AJEx Tech Empire.",
  primaryButtonText = "Get Your Custom Quote",
  primaryButtonHref = "/quote",
  secondaryButtonText = "Schedule a Call",
  secondaryButtonHref = "/contact",
  variant = "gradient",
}: PremiumCTABannerProps) {
  const variants = {
    default: "bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-blue-500/20",
    dark: "bg-slate-950 border-slate-800",
    gradient: "bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border-blue-500/30",
  }

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 border-y ${variants[variant]}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">Limited Time Offer</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{title}</h2>
        <p className="text-xl text-gray-300 mb-8 text-pretty">{subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButtonHref}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg group"
            >
              {primaryButtonText}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={secondaryButtonHref}>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/30 text-white hover:bg-blue-500/10 px-8 py-6 text-lg rounded-lg bg-transparent"
            >
              {secondaryButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
