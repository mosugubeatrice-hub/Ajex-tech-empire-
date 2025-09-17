"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Rocket, Target } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed and performance",
    metric: "< 2s load time",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security protocols",
    metric: "99.9% uptime",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Rocket,
    title: "Scalable Growth",
    description: "Built to handle massive scale",
    metric: "10M+ requests/day",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Data-driven optimization",
    metric: "300% ROI increase",
    color: "from-blue-500 to-cyan-500",
  },
]

export function PremiumShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("premium-showcase")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="premium-showcase" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-white">Premium Features</Badge>
          <h2
            className={`text-4xl lg:text-5xl font-bold mb-6 text-balance transition-all duration-1000 ${
              isVisible ? "animate-in fade-in-0 slide-in-from-bottom-4" : "opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Engineering Excellence
            </span>
          </h2>
          <p
            className={`text-xl text-muted-foreground text-pretty max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "animate-in fade-in-0 slide-in-from-bottom-4" : "opacity-0"
            }`}
          >
            Every pixel, every interaction, every line of code is crafted with precision to deliver unparalleled
            performance and user experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Feature Display */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "animate-in fade-in-0 slide-in-from-left-4" : "opacity-0"
            }`}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-500 hover:shadow-2xl ${
                  activeFeature === index
                    ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 shadow-glow-primary"
                    : "bg-card/50 hover:bg-card/80"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {feature.metric}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Visual Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? "animate-in fade-in-0 slide-in-from-right-4" : "opacity-0"
            }`}
          >
            <div className="relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-premium">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"></div>

              {/* Animated Metrics Display */}
              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <div
                    className={`text-6xl font-bold bg-gradient-to-r ${features[activeFeature].color} bg-clip-text text-transparent transition-all duration-500`}
                  >
                    {features[activeFeature].metric}
                  </div>
                  <div className="text-lg text-muted-foreground mt-2">{features[activeFeature].title}</div>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === activeFeature ? "w-8 bg-gradient-to-r from-primary to-secondary" : "w-2 bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Call to Action */}
                <div className="text-center pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Experience the Difference
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-xl animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
