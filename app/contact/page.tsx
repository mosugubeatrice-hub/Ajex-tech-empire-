"use client"

import { Navigation } from "@/components/navigation"
import { EnhancedContactForm } from "@/components/enhanced-contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Award, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            Start Your Project
          </h1>
          <p className="text-xl text-muted-foreground text-pretty animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
            Ready to transform your digital presence into a growth engine? Let's discuss your goals and build a strategy
            to achieve them.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-300">
              <EnhancedContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-in fade-in-0 slide-in-from-right-4 duration-1000 delay-500">
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </h2>
                <p className="text-lg text-muted-foreground text-pretty mb-8">
                  We're excited to learn about your business and discuss how we can help you achieve your growth
                  objectives. Our team is ready to provide strategic insights and technical expertise tailored to your
                  unique needs.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@ajextechempire.com",
                    delay: "delay-[600ms]",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+1 (555) 123-4567",
                    delay: "delay-[700ms]",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content: "123 Innovation Drive\nTech District, CA 90210",
                    delay: "delay-[800ms]",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 group animate-in fade-in-0 slide-in-from-right-4 duration-1000 ${item.delay}`}
                  >
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:scale-110">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-line">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 py-6">
                {[
                  { icon: Clock, label: "24h Response", value: "Guaranteed" },
                  { icon: Award, label: "Success Rate", value: "98%" },
                  { icon: Users, label: "Happy Clients", value: "500+" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10"
                  >
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-right-4 duration-1000 delay-[900ms]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    What Happens Next?
                  </h3>
                  <div className="space-y-4">
                    {[
                      "We'll review your information and respond within 24 hours",
                      "Schedule a strategic consultation to discuss your goals",
                      "Receive a custom growth strategy proposal",
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-3 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-sm text-primary-foreground font-bold shadow-lg group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <p className="text-muted-foreground pt-1 group-hover:text-foreground transition-colors">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on scope and complexity. Most website projects take 6-12 weeks, while comprehensive growth strategies can take 3-6 months to fully implement.",
              },
              {
                question: "Do you work with businesses of all sizes?",
                answer:
                  "We specialize in working with scaling SaaS companies and premium digital brands. Our ideal clients are ambitious businesses ready to invest in measurable growth.",
              },
              {
                question: "What makes AJEx Tech Empire different?",
                answer:
                  "Our focus on measurable ROI, technical excellence, and strategic precision sets us apart. We don't just deliver projects – we engineer growth systems that compound over time.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes, we offer comprehensive ongoing support and optimization services to ensure your digital assets continue performing at peak levels.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-background border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground text-pretty">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
