"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const caseStudies = [
    {
      id: 1,
      title: "SaaS Platform Growth",
      category: "web-design",
      description: "Transformed a B2B SaaS platform with a complete redesign and growth strategy",
      metrics: [
        { label: "Traffic Growth", value: "340%" },
        { label: "Conversion Rate", value: "+2.8%" },
        { label: "Revenue Impact", value: "$2.4M" },
      ],
      image: "/saas-dashboard-modern.jpg",
      tags: ["Web Design", "Growth Strategy", "Conversion Optimization"],
    },
    {
      id: 2,
      title: "E-Commerce Optimization",
      category: "seo",
      description: "Implemented comprehensive SEO strategy and content marketing for online retailer",
      metrics: [
        { label: "Organic Traffic", value: "520%" },
        { label: "Keyword Rankings", value: "1,200+" },
        { label: "Revenue Growth", value: "185%" },
      ],
      image: "/ecommerce-store-modern.jpg",
      tags: ["SEO", "Content Strategy", "Technical SEO"],
    },
    {
      id: 3,
      title: "Performance Marketing Campaign",
      category: "marketing",
      description: "Multi-channel performance marketing campaign driving qualified leads",
      metrics: [
        { label: "Lead Generation", value: "450%" },
        { label: "Cost Per Lead", value: "-62%" },
        { label: "ROI", value: "8.5x" },
      ],
      image: "/marketing-analytics-dashboard.jpg",
      tags: ["Performance Marketing", "Lead Generation", "Analytics"],
    },
    {
      id: 4,
      title: "Brand Transformation",
      category: "branding",
      description: "Complete brand identity redesign and positioning strategy",
      metrics: [
        { label: "Brand Awareness", value: "+280%" },
        { label: "Market Position", value: "Top 3" },
        { label: "Customer Loyalty", value: "+95%" },
      ],
      image: "/brand-identity-design.jpg",
      tags: ["Brand Strategy", "Design", "Positioning"],
    },
    {
      id: 5,
      title: "AI-Powered Marketing Automation",
      category: "ai",
      description: "Implemented AI-driven marketing automation increasing efficiency",
      metrics: [
        { label: "Automation Rate", value: "85%" },
        { label: "Time Saved", value: "40hrs/week" },
        { label: "Revenue Impact", value: "$1.8M" },
      ],
      image: "/ai-automation-interface.jpg",
      tags: ["AI Marketing", "Automation", "Efficiency"],
    },
    {
      id: 6,
      title: "Digital Transformation Initiative",
      category: "web-design",
      description: "Enterprise-level digital transformation across all customer touchpoints",
      metrics: [
        { label: "Customer Satisfaction", value: "+92%" },
        { label: "Operational Efficiency", value: "+65%" },
        { label: "Cost Reduction", value: "$3.2M" },
      ],
      image: "/enterprise-digital-platform.jpg",
      tags: ["Digital Transformation", "Enterprise", "Strategy"],
    },
  ]

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web-design", label: "Web Design" },
    { id: "seo", label: "SEO" },
    { id: "marketing", label: "Marketing" },
    { id: "branding", label: "Branding" },
    { id: "ai", label: "AI Solutions" },
  ]

  const filteredCaseStudies =
    activeFilter === "all" ? caseStudies : caseStudies.filter((cs) => cs.category === activeFilter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Our Work</h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore the digital transformations we've engineered for ambitious brands across industries.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                className="group rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <img
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">{caseStudy.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-blue-500/20">
                    {caseStudy.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg font-bold text-blue-400">{metric.value}</div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link href={`/work/${caseStudy.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group/btn">
                      View Case Study
                      <ExternalLink className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Create Your Success Story?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can transform your digital presence into a growth engine.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg group"
            >
              Start Your Project
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
