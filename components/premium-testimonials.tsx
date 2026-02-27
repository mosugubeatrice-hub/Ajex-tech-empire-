"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  title: string
  company: string
  content: string
  rating: number
  image: string
  results: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO",
    company: "TechVision Solutions",
    content:
      "AJEx Tech Empire transformed our digital presence completely. Our conversion rates increased by 340% within the first quarter, and we've seen sustained growth ever since.",
    rating: 5,
    image: "/professional-woman-ceo.png",
    results: "340% conversion increase",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Founder",
    company: "InnovateLab",
    content:
      "The strategic approach and attention to detail exceeded our expectations. Our organic traffic grew by 280% and lead quality improved dramatically.",
    rating: 5,
    image: "/professional-man-founder.png",
    results: "280% traffic growth",
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "CMO",
    company: "GrowthCorp",
    content:
      "Working with AJEx was a game-changer. They didn't just build us a website; they created a revenue-generating machine that continues to deliver exceptional results.",
    rating: 5,
    image: "/professional-woman-cmo.png",
    results: "450% ROI improvement",
  },
]

export function PremiumTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold mb-6 text-balance">
            Success Stories That Inspire
          </h2>
          <p className="text-xl font-inter text-muted-foreground text-pretty">
            Discover how we've transformed businesses across industries with our precision-engineered solutions.
          </p>
        </div>

        <div className="relative">
          {/* Main testimonial display */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="glass-card border-primary/20 mx-4">
                    <CardContent className="p-12">
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Quote content */}
                        <div className="flex-1 text-center lg:text-left">
                          <Quote className="h-12 w-12 text-secondary mb-6 mx-auto lg:mx-0 fill-current" />

                          <blockquote className="text-2xl lg:text-3xl font-inter leading-relaxed text-foreground mb-8 text-pretty">
                            "{testimonial.content}"
                          </blockquote>

                          {/* Rating */}
                          <div className="flex justify-center lg:justify-start mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Icons.Star key={i} className="h-6 w-6 text-secondary fill-current" />
                            ))}
                          </div>

                          {/* Results badge */}
                          <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full mb-6">
                            <span className="text-primary font-montserrat font-semibold">{testimonial.results}</span>
                          </div>
                        </div>

                        {/* Author info */}
                        <div className="text-center lg:text-right">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full mx-auto lg:mx-0 mb-4 border-2 border-primary/20"
                          />
                          <h4 className="text-xl font-poppins font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-secondary font-montserrat font-semibold">{testimonial.title}</p>
                          <p className="text-muted-foreground font-inter">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 border-primary/20 hover:border-primary/50 bg-transparent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoPlaying(false)
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-primary/50",
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 border-primary/20 hover:border-primary/50 bg-transparent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
