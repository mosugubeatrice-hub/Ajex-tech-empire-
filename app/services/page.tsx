"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ScrollProgress } from "@/components/scroll-progress"
import { ArrowRight, BarChart3, Search, Target, Code } from "lucide-react"
import { InteractiveServiceCard } from "@/components/interactive-service-card"

export const dynamic = "force-dynamic"

export default function ServicesPage() {
  const services = [
    {
      iconName: "globe",
      title: "Premium Web Design & Development",
      description:
        "We create stunning, high-performance websites that convert visitors into customers. Every design decision is backed by data and optimized for maximum conversion rates and user engagement.",
      features: [
        "Custom design tailored to your brand",
        "Mobile-first responsive optimization",
        "Conversion rate optimization",
        "Technical SEO foundation",
        "Ongoing maintenance and support",
      ],
    },
    {
      iconName: "bar-chart",
      title: "Strategic SEO & Content",
      description:
        "Our data-driven SEO strategies position your brand as an industry authority and drive sustainable organic growth through targeted content and technical excellence.",
      features: [
        "Comprehensive technical SEO audit",
        "Strategic content planning",
        "Advanced keyword research",
        "Performance tracking and analytics",
        "Continuous optimization",
      ],
    },
    {
      iconName: "zap",
      title: "Performance Marketing",
      description:
        "We manage precision-targeted advertising campaigns that deliver measurable ROI and scalable customer acquisition across multiple channels.",
      features: [
        "Multi-channel campaign strategy",
        "Advanced audience targeting",
        "A/B testing and optimization",
        "ROI tracking and reporting",
        "Continuous performance optimization",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-float-delayed" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold mb-6 animate-in slide-in-from-top-4">
            Premium Digital Solutions
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance animate-in slide-in-from-bottom-4 duration-700">
            Our Solutions
          </h1>
          <p className="text-xl text-muted-foreground text-pretty animate-in slide-in-from-bottom-4 duration-700 delay-200">
            We provide comprehensive digital growth solutions tailored to ambitious brands. Our integrated approach
            ensures every element of your digital presence works together to drive measurable business results.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-1 gap-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <InteractiveServiceCard {...service} index={index} />
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-border relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={`/.jpg?height=400&width=400&query=${service.title.toLowerCase()} dashboard mockup`}
                      alt={`${service.title} visualization`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Our Proven Process</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Every project follows our systematic approach to ensure exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                iconName: "search",
                title: "Discovery & Audit",
                description: "Deep analysis of your current digital presence and growth opportunities",
              },
              {
                iconName: "target",
                title: "Strategy Development",
                description: "Custom growth strategy aligned with your business objectives",
              },
              {
                iconName: "code",
                title: "Precision Execution",
                description: "Flawless implementation using cutting-edge technologies",
              },
              {
                iconName: "bar-chart",
                title: "Optimization & Growth",
                description: "Continuous monitoring and optimization for maximum ROI",
              },
            ].map((step, index) => {
              const iconMap = {
                search: Search,
                target: Target,
                code: Code,
                "bar-chart": BarChart3,
              }
              const Icon = iconMap[step.iconName as keyof typeof iconMap]
              return (
                <div key={step.title} className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-sm text-secondary font-semibold">Step {index + 1}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-pretty">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Ready to Accelerate Your Growth?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Let's discuss how our solutions can transform your digital presence into a growth engine.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow group">
            Schedule Your Free Consultation
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 AJEx Tech Empire. All rights reserved. Precision-engineered for growth.
          </p>
        </div>
      </footer>
    </div>
  )
}
