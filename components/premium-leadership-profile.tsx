"use client"

import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

interface LeadershipProfileProps {
  name: string
  title: string
  image: string
  quote: string
  description: string
}

export function PremiumLeadershipProfile({ name, title, image, quote, description }: LeadershipProfileProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div
        className={`order-2 lg:order-1 transform transition-all duration-1000 ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}
      >
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {name}
          </h2>
          <p className="text-xl text-primary font-semibold">{title}</p>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground">
          <p className="text-pretty">{description}</p>

          <blockquote className="relative border-l-4 border-primary pl-6 py-6 bg-gradient-to-r from-card/50 to-background/50 rounded-r-lg backdrop-blur-sm">
            <div className="absolute -left-2 top-4 w-4 h-4 bg-primary rounded-full animate-pulse" />
            <p className="text-foreground font-medium text-pretty mb-3 text-lg leading-relaxed">"{quote}"</p>
            <cite className="text-sm text-muted-foreground font-semibold">
              — {name}, {title}
            </cite>
          </blockquote>

          <div className="pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Connect with Leadership
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`order-1 lg:order-2 transform transition-all duration-1000 delay-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}
      >
        <div className="relative group">
          <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-2xl p-8 backdrop-blur-sm border border-border group-hover:border-primary/50 transition-all duration-500 animate-float">
            <img
              src={image || "/placeholder.svg"}
              alt={`${name} - ${title}`}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-border group-hover:scale-110 transition-transform duration-300 animate-pulse">
            <TrendingUp className="h-12 w-12 text-primary" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
        </div>
      </div>
    </div>
  )
}
