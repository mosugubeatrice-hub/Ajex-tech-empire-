"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Palette, Code, Brain, Target, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { PremiumTestimonials } from "@/components/premium-testimonials"

export const dynamic = "force-dynamic"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const services = [
    {
      iconName: "code",
      title: "Web Design & Development",
      description: "High-performance digital experiences that convert",
    },
    {
      iconName: "trending-up",
      title: "SEO & Content Strategy",
      description: "From visibility to conversion — organic growth that scales",
    },
    {
      iconName: "target",
      title: "Performance Marketing",
      description: "Precision-targeted campaigns that drive predictable revenue",
    },
    {
      iconName: "palette",
      title: "Brand Strategy & Design",
      description: "Visual identity that commands market presence",
    },
    {
      iconName: "brain",
      title: "AI-Powered Marketing",
      description: "Intelligent automation that amplifies your growth",
    },
    {
      iconName: "sparkles",
      title: "Growth Consulting",
      description: "Strategic roadmaps for sustainable business expansion",
    },
  ]

  const stats = [
    { value: "50+", label: "Successful Projects" },
    { value: "250%", label: "Average Client Growth" },
    { value: "95%", label: "Client Retention" },
    { value: "3x", label: "Industry ROI Standard" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 text-center max-w-4xl transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium">
              ✨ Premium Digital Growth Agency
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            We Build Digital Empires That Move Fast and Win Big
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Precision-engineered digital growth for ambitious brands. Transform your digital presence into your most
            powerful growth engine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg group"
              >
                Book a Strategy Call
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link href="/work">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/30 text-white hover:bg-blue-500/10 px-8 py-6 text-lg rounded-lg bg-transparent"
              >
                Explore Our Work
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-blue-500/20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-400">Comprehensive digital solutions designed for growth</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const iconMap = {
                code: Code,
                "trending-up": TrendingUp,
                target: Target,
                palette: Palette,
                brain: Brain,
                sparkles: Sparkles,
              }
              const Icon = iconMap[service.iconName as keyof typeof iconMap]
              return (
                <div
                  key={i}
                  className="group p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-950/50 to-purple-950/50 border-y border-blue-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Led by Vision. Driven by Precision.</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                At AJEx Tech Empire, we merge strategic precision with bold creativity to deliver measurable digital
                growth. Founded by Isaac Ajeh, our agency helps brands rise with speed, clarity, and purpose.
              </p>
              <p className="text-gray-400 mb-8">
                We started AJEx because most agencies chase aesthetics, not results. We fix that with precision,
                innovation, and strategy that actually moves the needle.
              </p>
              <Link href="/about">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Learn More About Us
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 flex items-center justify-center overflow-hidden">
              <img
                src="/ceo.jpg"
                alt="Isaac Ajeh, Founder & CEO - AJEx Tech Empire"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <PremiumTestimonials />

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Elevate Your Brand?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join 500+ ambitious brands that have transformed their digital presence with AJEx Tech Empire. Let's create
            digital growth that actually moves the needle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg"
              >
                Get Your Custom Quote
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500/30 text-white hover:bg-blue-500/10 px-8 py-6 text-lg rounded-lg bg-transparent"
              >
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
