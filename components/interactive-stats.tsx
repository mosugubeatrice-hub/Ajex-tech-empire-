"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

interface StatItem {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  description: string
  color: string
}

const stats: StatItem[] = [
  {
    icon: <Icons.TrendingUp className="h-8 w-8" />,
    value: 247,
    suffix: "%",
    label: "Revenue Growth",
    description: "Average increase within 6 months",
    color: "text-primary",
  },
  {
    icon: <Users className="h-8 w-8" />,
    value: 89,
    suffix: "%",
    label: "Client Retention",
    description: "Long-term partnerships built on results",
    color: "text-secondary",
  },
  {
    icon: <Target className="h-8 w-8" />,
    value: 156,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successful transformations across industries",
    color: "text-primary",
  },
  {
    icon: <Award className="h-8 w-8" />,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Projects exceeding performance targets",
    color: "text-secondary",
  },
]

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-poppins font-bold">
      {count}
      {suffix}
    </div>
  )
}

export function InteractiveStats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold mb-6 text-balance">
            Results That Define Excellence
          </h2>
          <p className="text-xl font-inter text-muted-foreground text-pretty max-w-3xl mx-auto">
            Our precision-engineered approach delivers measurable outcomes that transform businesses into market
            leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="glass-card hover:border-primary/50 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-300 flex justify-center`}
                >
                  {stat.icon}
                </div>

                <div className={`mb-2 ${stat.color}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                <h3 className="text-xl font-montserrat font-bold mb-2 text-foreground">{stat.label}</h3>

                <p className="text-muted-foreground font-inter text-sm text-pretty">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
