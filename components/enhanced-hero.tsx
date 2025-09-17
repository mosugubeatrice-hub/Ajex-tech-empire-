"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21 5,3" />
  </svg>
)

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
)

export function EnhancedHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)

  const words = ["Transform", "Accelerate", "Dominate", "Revolutionize", "Supercharge"]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={cn("space-y-8", isVisible && "animate-fade-in-up")}>
            {/* Dynamic headline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-montserrat font-semibold">
                <Sparkles className="h-5 w-5" />
                <span>Digital Growth Specialists</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-poppins font-bold leading-tight">
                <span className="gradient-text">{words[currentWord]}</span>
                <br />
                <span className="text-foreground">Your Digital</span>
                <br />
                <span className="text-foreground">Empire</span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl font-inter text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              We engineer high-performance digital experiences that convert visitors into customers and transform
              businesses into market leaders. Join 500+ companies that chose growth over stagnation.
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-montserrat font-semibold px-8 py-4 text-lg btn-primary animate-glow"
              >
                Claim Your Free Growth Strategy
                <Icons.ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-montserrat font-semibold px-8 py-4 text-lg bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                See 247% Growth Results
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-poppins font-bold text-primary">247%</div>
                <div className="text-sm font-inter text-muted-foreground">Avg Revenue Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-poppins font-bold text-secondary">500+</div>
                <div className="text-sm font-inter text-muted-foreground">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-poppins font-bold text-primary">89%</div>
                <div className="text-sm font-inter text-muted-foreground">Client Retention</div>
              </div>
            </div>
          </div>

          {/* Enhanced visual element */}
          <div className={cn("relative", isVisible && "animate-scale-in")}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl animate-float glass-card flex items-center justify-center">
                <div className="text-2xl">📈</div>
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/20 rounded-xl animate-float glass-card flex items-center justify-center"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-xl">⚡</div>
              </div>

              {/* Main visual */}
              <div className="glass-card rounded-3xl p-8 h-full flex items-center justify-center animate-pulse-glow">
                <img
                  src="/premium-laptop-mockup-showing-modern-website-desig.jpg"
                  alt="Premium digital transformation showcase"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
