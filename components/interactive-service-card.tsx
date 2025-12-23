"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Sparkles, Globe, BarChart3, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap = {
  globe: Globe,
  "bar-chart": BarChart3,
  zap: Zap,
}

interface ServiceCardProps {
  iconName: keyof typeof iconMap
  title: string
  description: string
  features: string[]
  index: number
}

export function InteractiveServiceCard({ iconName, title, description, features, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = iconMap[iconName]

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
        "bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50",
        "hover:border-primary/30 hover:bg-gradient-to-br hover:from-card/90 hover:to-primary/5",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
      </div>

      <CardHeader className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={cn(
              "p-4 rounded-xl transition-all duration-300",
              "bg-gradient-to-br from-primary/10 to-secondary/10",
              "group-hover:from-primary/20 group-hover:to-secondary/20",
              "group-hover:scale-110 group-hover:rotate-3",
            )}
          >
            <Icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-secondary" />
          </div>
          <div>
            <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
            <div className="text-sm text-secondary font-medium mt-1">Service {String(index + 1).padStart(2, "0")}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">{description}</p>

        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            Key Features:
            <div
              className={cn(
                "w-2 h-2 rounded-full bg-primary transition-all duration-300",
                isHovered && "animate-pulse",
              )}
            />
          </h4>
          <ul className="space-y-3">
            {features.map((feature, featureIndex) => (
              <li
                key={feature}
                className={cn("flex items-start gap-3 transition-all duration-300", "hover:translate-x-1")}
                style={{
                  animationDelay: isHovered ? `${featureIndex * 100}ms` : "0ms",
                }}
              >
                <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0 transition-colors duration-300 group-hover:text-primary" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant="outline"
          className={cn(
            "w-full group/btn transition-all duration-300",
            "hover:bg-primary hover:text-primary-foreground hover:border-primary",
            "hover:shadow-lg hover:shadow-primary/25",
          )}
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
