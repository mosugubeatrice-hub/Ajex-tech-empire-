"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface CaseStudyProps {
  client: string
  challenge: string
  solution: string
  results: string
  metrics: Array<{
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
  }>
  index: number
}

export function AnimatedCaseStudy({ client, challenge, solution, results, metrics, index }: CaseStudyProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-700",
        "bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-border/50",
        "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30",
        isExpanded && "scale-[1.02]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="grid lg:grid-cols-2 gap-0 relative z-10">
        <div className="p-8 lg:p-12">
          <CardHeader className="p-0 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-secondary text-sm font-semibold">
                Case Study #{String(index + 1).padStart(2, "0")}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-primary/10"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isExpanded ? "Less" : "More"}
              </Button>
            </div>
            <CardTitle className="text-3xl mb-4 group-hover:text-primary transition-colors duration-300">
              {client}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-6">
            <div className={cn("transition-all duration-500", isExpanded ? "opacity-100 max-h-none" : "opacity-80")}>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                The Challenge
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">{challenge}</p>
            </div>

            <div className={cn("transition-all duration-500", isExpanded ? "opacity-100 max-h-none" : "opacity-80")}>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                Our Solution
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">{solution}</p>
            </div>

            <div className={cn("transition-all duration-500", isExpanded ? "opacity-100 max-h-none" : "opacity-100")}>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                The Results
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </h3>
              <p className="text-muted-foreground text-pretty leading-relaxed font-medium">{results}</p>
            </div>

            {isExpanded && (
              <div className="animate-in slide-in-from-top-4 duration-500">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  View Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 lg:p-12 flex flex-col justify-center relative">
          {/* Floating elements */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-3 h-3 rounded-full bg-primary animate-bounce" />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-8 group-hover:text-primary transition-colors duration-300">
              Key Metrics
            </h3>
            <div className="grid gap-6">
              {metrics.map((metric, metricIndex) => (
                <div
                  key={metric.label}
                  className={cn(
                    "flex items-center gap-4 transition-all duration-500 hover:scale-105",
                    isHovered && "animate-in slide-in-from-left-4",
                  )}
                  style={{
                    animationDelay: isHovered ? `${metricIndex * 150}ms` : "0ms",
                  }}
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 border border-border/30">
              <img
                src={`/abstract-geometric-shapes.png?height=200&width=300&query=${client} analytics dashboard`}
                alt={`${client} results visualization`}
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
