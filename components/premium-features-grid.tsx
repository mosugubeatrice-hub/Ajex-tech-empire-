"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  metrics?: string
}

interface PremiumFeaturesGridProps {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function PremiumFeaturesGrid({
  title = "Why Choose AJEx Tech Empire",
  subtitle = "Industry-leading solutions backed by proven results",
  features,
  columns = 3,
}: PremiumFeaturesGridProps) {
  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">{title}</h2>
            {subtitle && <p className="text-xl text-gray-300 text-pretty">{subtitle}</p>}
          </div>
        )}

        <div className={`grid gap-8 ${gridClass[columns]}`}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/50 group transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-blue-500/20 rounded-lg w-fit group-hover:bg-blue-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 text-pretty">{feature.description}</p>
                  {feature.metrics && (
                    <div className="pt-3 border-t border-blue-500/20">
                      <p className="text-blue-400 font-semibold text-sm">{feature.metrics}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
