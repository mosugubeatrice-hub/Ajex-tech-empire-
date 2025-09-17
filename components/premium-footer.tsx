"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { useState } from "react"

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

export function PremiumFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "footer",
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setStatusMessage(result.message)
        setEmail("")
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
          setStatusMessage("")
        }, 5000)
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.error || "Something went wrong")
        // Reset error after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
          setStatusMessage("")
        }, 5000)
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Network error. Please try again.")
      setTimeout(() => {
        setSubmitStatus("idle")
        setStatusMessage("")
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stay Ahead of the Curve
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Get exclusive insights, growth strategies, and industry updates delivered to your inbox.
          </p>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-6 max-w-md mx-auto">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400">{statusMessage}</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6 max-w-md mx-auto">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{statusMessage}</span>
            </div>
          )}

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : submitStatus === "success" ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg text-xl font-poppins font-bold">
                    AJEx
                  </div>
                </div>
                <span className="text-xl font-poppins font-bold text-foreground">Tech Empire</span>
              </Link>
              <p className="text-muted-foreground mb-6 text-pretty">
                Precision-engineered digital growth solutions for visionary brands ready to dominate their markets.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-muted hover:bg-primary/10 rounded-lg transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-foreground">Services</h4>
              <ul className="space-y-4">
                {[
                  { name: "Web Design & Development", href: "/services" },
                  { name: "SEO & Content Strategy", href: "/services" },
                  { name: "Performance Marketing", href: "/services" },
                  { name: "Brand Strategy", href: "/services" },
                  { name: "Growth Consulting", href: "/services" },
                ].map((service) => (
                  <li key={service.name}>
                    <Link href={service.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-foreground">Company</h4>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Leadership", href: "/leadership" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "Blog", href: "/blog" },
                  { name: "Client Portal", href: "/portal" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-foreground">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icons.Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">hello@ajextechempire.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icons.MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground">
                      123 Innovation Drive
                      <br />
                      Tech District, CA 90210
                    </p>
                  </div>
                </div>
              </div>

              <Card className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-4">
                  <h5 className="font-semibold mb-2 text-foreground">Ready to Start?</h5>
                  <p className="text-sm text-muted-foreground mb-3">Schedule a free consultation today.</p>
                  <Link href="/book-consultation">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      Book Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} AJEx Tech Empire. All rights reserved. Precision-engineered for growth.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
