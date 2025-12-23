import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedPhilosophyCards } from "@/components/animated-philosophy-cards"
import { PremiumLeadershipProfile } from "@/components/premium-leadership-profile"
import { AnimatedStatsGrid } from "@/components/animated-stats-grid"

export const dynamic = "force-dynamic"

export default function LeadershipPage() {
  const principles = [
    {
      iconName: "target" as const,
      title: "Visionary Execution",
      description: "Big ideas require flawless execution - we bridge strategy with implementation",
    },
    {
      iconName: "users" as const,
      title: "Client Success Focus",
      description: "Your growth is our most important metric - we're invested in your success",
    },
    {
      iconName: "trending-up" as const,
      title: "Technical Excellence",
      description: "We stay at the forefront of digital innovation to deliver cutting-edge solutions",
    },
  ]

  const leadershipStats = [
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
            Our Founder
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Meet the visionary leader driving innovation and excellence at AJEx Tech Empire.
          </p>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <PremiumLeadershipProfile
            name="Isaac Ajeh"
            title="Founder & CEO"
            image="/professional-headshot-of-isaac-ajeh--ceo-and-found.jpg"
            quote="We believe that exceptional digital execution should be accessible to every ambitious brand. Our mission is to become the most valuable investment our clients make in their growth journey."
            description="Isaac Ajeh founded AJEx Tech Empire with a vision to redefine what brands should expect from their digital partners. With extensive experience in digital strategy, technical implementation, and business growth, he leads our team with a focus on strategic innovation and measurable client success."
          />
        </div>
      </section>

      {/* Leadership Principles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Leadership Principles</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              The core values that guide our approach to client partnerships and business growth.
            </p>
          </div>

          <AnimatedPhilosophyCards philosophies={principles} />
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">Our Vision for the Future</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p className="text-pretty">
              At AJEx Tech Empire, we envision a future where every ambitious brand has access to world-class digital
              growth strategies that deliver predictable, measurable results. We're building the premier destination for
              companies that refuse to settle for mediocre digital presence.
            </p>
            <p className="text-pretty">
              Our commitment extends beyond individual projects – we're creating lasting partnerships that evolve with
              our clients' growth, ensuring they maintain competitive advantages in an ever-changing digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <AnimatedStatsGrid
        stats={leadershipStats}
        title="Leadership Impact"
        subtitle="Measurable results under Isaac's strategic leadership."
      />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Ready to Work with Visionary Leadership?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Experience the difference that strategic vision and technical excellence make.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Schedule a Leadership Consultation
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
