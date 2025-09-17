"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  value: string
  label: string
}

interface AnimatedStatsGridProps {
  stats: StatItem[]
  title?: string
  subtitle?: string
}

export function AnimatedStatsGrid({ stats, title, subtitle }: AnimatedStatsGridProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => "0"))
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // Animate numbers
          stats.forEach((stat, index) => {
            const numericValue = Number.parseInt(stat.value.replace(/[^\d]/g, ""))
            if (numericValue) {
              let current = 0
              const increment = numericValue / 50
              const timer = setInterval(() => {
                current += increment
                if (current >= numericValue) {
                  current = numericValue
                  clearInterval(timer)
                }
                setAnimatedStats((prev) => {
                  const newStats = [...prev]
                  newStats[index] = stat.value.replace(/\d+/, Math.floor(current).toString())
                  return newStats
                })
              }, 30)
            } else {
              setAnimatedStats((prev) => {
                const newStats = [...prev]
                newStats[index] = stat.value
                return newStats
              })
            }
          })
        }
      },
      { threshold: 0.3 },
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [stats])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{title}</h2>}
            {subtitle && <p className="text-xl text-muted-foreground text-pretty">{subtitle}</p>}
          </div>
        )}

        <div ref={gridRef} className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transform transition-all duration-700 delay-${index * 100} ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/10">
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                  {animatedStats[index]}
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
