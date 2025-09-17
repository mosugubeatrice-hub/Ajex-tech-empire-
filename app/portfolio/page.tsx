import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { AnimatedCaseStudy } from "@/components/animated-case-study"
import { AnimatedCounter } from "@/components/animated-counter"
import { ScrollProgress } from "@/components/scroll-progress"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"

export default function PortfolioPage() {
  const caseStudies = [
    {
      client: "TechFlow SaaS",
      challenge:
        "The client needed to increase qualified lead generation and establish market leadership in a competitive space.",
      solution:
        "We developed a comprehensive growth strategy including website redesign, content strategy, and targeted SEO optimization.",
      results: "187% increase in organic traffic, 4.5% conversion rate, 120+ qualified leads per month",
      metrics: [
        { icon: TrendingUp, label: "Organic Traffic", value: "+187%" },
        { icon: Users, label: "Conversion Rate", value: "4.5%" },
        { icon: DollarSign, label: "Monthly Leads", value: "120+" },
      ],
    },
    {
      client: "InnovateCorp",
      challenge: "Struggling with low online visibility and poor website performance affecting customer acquisition.",
      solution:
        "Complete digital transformation including modern web design, technical SEO overhaul, and performance marketing campaigns.",
      results: "300% increase in website speed, 250% boost in search rankings, 180% growth in qualified inquiries",
      metrics: [
        { icon: TrendingUp, label: "Page Speed", value: "+300%" },
        { icon: Users, label: "Search Rankings", value: "+250%" },
        { icon: DollarSign, label: "Inquiries", value: "+180%" },
      ],
    },
    {
      client: "GrowthTech Solutions",
      challenge: "Needed to scale customer acquisition while maintaining quality leads and improving ROI.",
      solution:
        "Implemented data-driven performance marketing strategy with advanced targeting and conversion optimization.",
      results: "400% increase in qualified leads, 60% reduction in cost per acquisition, 220% ROI improvement",
      metrics: [
        { icon: TrendingUp, label: "Qualified Leads", value: "+400%" },
        { icon: Users, label: "Cost Reduction", value: "-60%" },
        { icon: DollarSign, label: "ROI Improvement", value: "+220%" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float-delayed" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6 animate-in slide-in-from-top-4">
            Client Success Stories
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance animate-in slide-in-from-bottom-4 duration-700">
            Proven Results
          </h1>
          <p className="text-xl text-muted-foreground text-pretty animate-in slide-in-from-bottom-4 duration-700 delay-200">
            Our work speaks for itself. We measure success by the tangible business growth we deliver for our clients.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <AnimatedCaseStudy key={study.client} {...study} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Growth by the Numbers</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Measurable results across all our client partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedCounter value="250%" label="Average Traffic Increase" />
            <AnimatedCounter value="4.2%" label="Average Conversion Rate" />
            <AnimatedCounter value="180%" label="Average ROI Improvement" />
            <AnimatedCounter value="95%" label="Client Retention Rate" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Ready to Join Our Success Stories?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Let's create measurable growth for your business.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow group">
            Start Your Growth Journey
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 AJEx Tech Empire. All rights reserved. Precision-engineered for growth.
          </p>
        </div>
      </footer>
    </div>
  )
}
