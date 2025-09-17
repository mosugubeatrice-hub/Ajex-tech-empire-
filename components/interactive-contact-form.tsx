"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle, Loader2, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  company: string
  email: string
  goal: string
  budget: string
  message: string
}

export function InteractiveContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    goal: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.goal,
          budget: formData.budget,
          message: formData.message,
          projectType: "consultation",
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after success animation
        setTimeout(() => {
          setFormData({
            name: "",
            company: "",
            email: "",
            goal: "",
            budget: "",
            message: "",
          })
          setIsSubmitted(false)
        }, 5000)
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (submitError) {
      setSubmitError("")
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 animate-in fade-in-0 zoom-in-95 duration-500">
        <CardContent className="p-12 text-center">
          <div className="animate-in zoom-in-0 duration-700 delay-200">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
            <p className="text-muted-foreground text-lg">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Get Started Today
        </CardTitle>
        <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {submitError && (
            <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{submitError}</span>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 group">
              <Label htmlFor="name" className="group-focus-within:text-primary transition-colors">
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`bg-input/50 border-border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                  errors.name ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-sm animate-in slide-in-from-left-2">{errors.name}</p>}
            </div>
            <div className="space-y-2 group">
              <Label htmlFor="company" className="group-focus-within:text-primary transition-colors">
                Company Name *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className={`bg-input/50 border-border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                  errors.company ? "border-red-500 focus:border-red-500" : ""
                }`}
                placeholder="Your company name"
              />
              {errors.company && (
                <p className="text-red-500 text-sm animate-in slide-in-from-left-2">{errors.company}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="email" className="group-focus-within:text-primary transition-colors">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`bg-input/50 border-border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
              placeholder="your.email@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm animate-in slide-in-from-left-2">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">What is your primary business goal?</Label>
            <Select onValueChange={(value) => handleInputChange("goal", value)}>
              <SelectTrigger className="bg-input/50 border-border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20">
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="increase-traffic">Increase Website Traffic</SelectItem>
                <SelectItem value="improve-conversions">Improve Conversion Rates</SelectItem>
                <SelectItem value="generate-leads">Generate More Leads</SelectItem>
                <SelectItem value="brand-awareness">Build Brand Awareness</SelectItem>
                <SelectItem value="complete-redesign">Complete Website Redesign</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">What is your approximate monthly budget?</Label>
            <Select onValueChange={(value) => handleInputChange("budget", value)}>
              <SelectTrigger className="bg-input/50 border-border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k+">$100,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="message" className="group-focus-within:text-primary transition-colors">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              className="bg-input/50 border-border transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 resize-none"
              placeholder="Tell us more about your project, goals, and any specific requirements..."
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                Schedule Your Consultation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
