"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { Target, Users, TrendingUp } from "lucide-react"

interface PhilosophyData {
  iconName: "target" | "users" | "trending-up"
  title: string
  description: string
}

interface PhilosophyCardProps {
  iconName: "target" | "users" | "trending-up"
  title: string
  description: string
  index: number
}

const iconMap = {
  target: Target,
  users: Users,
  "trending-up": TrendingUp,
}

export function AnimatedPhilosophyCard({ iconName, title, description, index }: PhilosophyCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const Icon = iconMap[iconName]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <Card className="bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        <CardContent className="p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 animate-float">
                <Icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-muted-foreground text-pretty group-hover:text-foreground/80 transition-colors duration-300">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AnimatedPhilosophyCardsProps {
  philosophies: Array<PhilosophyData>
}

export function AnimatedPhilosophyCards({ philosophies }: AnimatedPhilosophyCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {philosophies.map((philosophy, index) => (
        <AnimatedPhilosophyCard
          key={philosophy.title}
          iconName={philosophy.iconName}
          title={philosophy.title}
          description={philosophy.description}
          index={index}
        />
      ))}
    </div>
  )
}
