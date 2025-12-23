import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedPhilosophyCards } from "@/components/animated-philosophy-cards"
import { AnimatedStatsGrid } from "@/components/animated-stats-grid"
import { PremiumTeamSection } from "@/components/premium-team-section"

export default function AboutPage() {
  const philosophies = [
    {
      iconName: "target" as const,
      title: "Strategic Precision",
      description:
        "We combine deep industry insight with technical excellence to deliver solutions that drive real business results",
    },
    {
      iconName: "users" as const,
      title: "Transparent Partnership",
      description: "We believe in complete transparency, clear communication, and collaborative problem-solving",
    },
    {
      iconName: "trending-up" as const,
      title: "Results Obsession",
      description: "We measure our success by your growth - everything we do is focused on delivering measurable ROI",
    },
  ]

  const companyStats = [
    { value: "50+", label: "Successful Projects" },
    { value: "250%", label: "Average Client Growth" },
    { value: "95%", label: "Client Retention Rate" },
    { value: "3x", label: "Industry ROI Standard" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer">
            Our Vision
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            AJEx Tech Empire was founded on a simple but powerful principle: digital growth should be predictable,
            measurable, and directly tied to business outcomes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">Redefining Digital Excellence</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p className="text-pretty">
                  In a world where digital presence determines business success, we believe that exceptional execution
                  should be accessible to every ambitious brand. Our mission is to become the most valuable investment
                  our clients make in their growth journey.
                </p>
                <p className="text-pretty">
                  We don't just build websites or run campaigns – we engineer growth systems that compound over time,
                  delivering sustainable competitive advantages that transform businesses from the inside out.
                </p>
                <p className="text-pretty">
                  Every project we undertake is guided by one fundamental question: "How can we create measurable
                  business impact that exceeds expectations?"
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 rounded-2xl p-1 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 group animate-float">
                <img
                  src="/ceo.jpg"
                  alt="Isaac Ajeh - AJEx Tech Empire Founder & CEO"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Our Philosophy</h2>
            <p className="text-xl text-muted-foreground text-pretty">Three core principles guide everything we do.</p>
          </div>
          <AnimatedPhilosophyCards philosophies={philosophies} />{" "}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">What Sets Us Apart</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Technical Excellence</h3>
                <p className="text-muted-foreground text-pretty">
                  We stay at the forefront of digital innovation, leveraging cutting-edge technologies and methodologies
                  to deliver solutions that perform at the highest level.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Data-Driven Decisions</h3>
                <p className="text-muted-foreground text-pretty">
                  Every strategy, design choice, and optimization is backed by comprehensive data analysis and proven
                  methodologies that eliminate guesswork.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Scalable Solutions</h3>
                <p className="text-muted-foreground text-pretty">
                  We build systems and strategies designed to grow with your business, ensuring long-term success and
                  sustainable competitive advantages.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">Client Partnership</h3>
                <p className="text-muted-foreground text-pretty">
                  We view every engagement as a true partnership, investing in your success and maintaining transparent
                  communication throughout our collaboration.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">Measurable Impact</h3>
                <p className="text-muted-foreground text-pretty">
                  Our success is measured by your growth. We provide detailed reporting and analytics that clearly
                  demonstrate the ROI of our partnership.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-secondary">Continuous Innovation</h3>
                <p className="text-muted-foreground text-pretty">
                  We continuously evolve our approaches, staying ahead of industry trends and emerging technologies to
                  maintain your competitive edge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <AnimatedStatsGrid
        stats={companyStats}
        title="Our Impact by Numbers"
        subtitle="Measurable results that speak for themselves."
      />

      {/* Team Section */}
      <PremiumTeamSection />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Partner with Visionaries</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Join the ranks of ambitious brands who've chosen precision over guesswork.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Start Your Partnership
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
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
