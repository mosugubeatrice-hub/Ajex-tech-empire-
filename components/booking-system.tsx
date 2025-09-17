"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ArrowRight, Video } from "lucide-react"

// Mock available time slots
const timeSlots = {
  "2024-01-22": ["09:00", "10:30", "14:00", "15:30"],
  "2024-01-23": ["09:00", "11:00", "13:30", "15:00", "16:30"],
  "2024-01-24": ["10:00", "11:30", "14:30", "16:00"],
  "2024-01-25": ["09:30", "11:00", "13:00", "14:30", "16:00"],
  "2024-01-26": ["09:00", "10:30", "15:00", "16:30"],
}

const consultationTypes = [
  {
    id: "strategy",
    name: "Strategy Consultation",
    duration: "30 minutes",
    description: "Discuss your project goals and get strategic recommendations",
    price: "Free",
  },
  {
    id: "technical",
    name: "Technical Deep Dive",
    duration: "60 minutes",
    description: "In-depth technical discussion about implementation approaches",
    price: "$150",
  },
  {
    id: "design",
    name: "Design Review",
    duration: "45 minutes",
    description: "Review your current design or discuss new design concepts",
    price: "$100",
  },
]

const teamMembers = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Digital Marketing Strategist",
    avatar: "/placeholder.svg?height=60&width=60",
    specialties: ["Digital Marketing", "Strategy", "Analytics"],
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Lead Developer",
    avatar: "/placeholder.svg?height=60&width=60",
    specialties: ["Web Development", "Mobile Apps", "Technical Architecture"],
  },
  {
    id: "emily",
    name: "Emily Rodriguez",
    role: "Creative Director",
    avatar: "/placeholder.svg?height=60&width=60",
    specialties: ["Brand Design", "UI/UX", "Creative Strategy"],
  },
]

interface BookingData {
  consultationType: string
  teamMember: string
  date: string
  time: string
  meetingType: string
  name: string
  email: string
  phone: string
  company: string
  projectDescription: string
}

export function BookingSystem() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    consultationType: "",
    teamMember: "",
    date: "",
    time: "",
    meetingType: "video",
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDescription: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const updateBookingData = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false)
      setIsBooked(true)
    }, 2000)
  }

  const getAvailableDates = () => {
    return Object.keys(timeSlots).map((date) => ({
      value: date,
      label: new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }))
  }

  const getAvailableTimes = () => {
    if (!bookingData.date) return []
    return (
      timeSlots[bookingData.date as keyof typeof timeSlots]?.map((time) => ({
        value: time,
        label: new Date(`2024-01-01 ${time}`).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      })) || []
    )
  }

  if (isBooked) {
    return (
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Consultation Booked!</h2>
          <p className="text-gray-300 mb-6">
            Your consultation has been successfully scheduled. You'll receive a confirmation email with meeting details
            and a calendar invite shortly.
          </p>
          <div className="bg-white/5 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Date & Time</p>
                <p className="text-white font-medium">
                  {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Consultant</p>
                <p className="text-white font-medium">
                  {teamMembers.find((m) => m.id === bookingData.teamMember)?.name}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Meeting Type</p>
                <p className="text-white font-medium">
                  {bookingData.meetingType === "video" ? "Video Call" : "Phone Call"}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Duration</p>
                <p className="text-white font-medium">
                  {consultationTypes.find((c) => c.id === bookingData.consultationType)?.duration}
                </p>
              </div>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
            Add to Calendar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Progress Steps */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 sticky top-8">
          <CardHeader>
            <CardTitle className="text-white">Booking Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { step: 1, title: "Select Service", icon: MessageSquare },
              { step: 2, title: "Choose Expert", icon: User },
              { step: 3, title: "Pick Date & Time", icon: Calendar },
              { step: 4, title: "Your Details", icon: Mail },
            ].map(({ step, title, icon: Icon }) => (
              <div
                key={step}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  currentStep === step
                    ? "bg-blue-500/20 border border-blue-500/30"
                    : currentStep > step
                      ? "bg-green-500/20 border border-green-500/30"
                      : "bg-white/5"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step ? "bg-blue-500" : currentStep > step ? "bg-green-500" : "bg-gray-600"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Icon className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className={`font-medium ${currentStep >= step ? "text-white" : "text-gray-400"}`}>{title}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Booking Form */}
      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              Step {currentStep} of 4:{" "}
              {currentStep === 1
                ? "Select Consultation Type"
                : currentStep === 2
                  ? "Choose Your Expert"
                  : currentStep === 3
                    ? "Pick Date & Time"
                    : "Your Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <div className="space-y-4">
                {consultationTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => updateBookingData("consultationType", type.id)}
                    className={`p-6 rounded-lg border cursor-pointer transition-all ${
                      bookingData.consultationType === type.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                      <Badge
                        className={`${type.price === "Free" ? "bg-green-500" : "bg-blue-500"} text-white border-0`}
                      >
                        {type.price}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-2">{type.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {type.duration}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Choose Expert */}
            {currentStep === 2 && (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => updateBookingData("teamMember", member.id)}
                    className={`p-6 rounded-lg border cursor-pointer transition-all ${
                      bookingData.teamMember === member.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/20 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                        <p className="text-blue-400 mb-2">{member.role}</p>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="border-white/20 text-gray-300 text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Date & Time */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Date</label>
                    <Select value={bookingData.date} onValueChange={(value) => updateBookingData("date", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Choose a date" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableDates().map((date) => (
                          <SelectItem key={date.value} value={date.value}>
                            {date.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Time</label>
                    <Select
                      value={bookingData.time}
                      onValueChange={(value) => updateBookingData("time", value)}
                      disabled={!bookingData.date}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableTimes().map((time) => (
                          <SelectItem key={time.value} value={time.value}>
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => updateBookingData("meetingType", "video")}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        bookingData.meetingType === "video"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Video Call</p>
                          <p className="text-gray-400 text-sm">Google Meet or Zoom</p>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => updateBookingData("meetingType", "phone")}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        bookingData.meetingType === "phone"
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-white/20 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">Phone Call</p>
                          <p className="text-gray-400 text-sm">Traditional phone call</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <Input
                      value={bookingData.name}
                      onChange={(e) => updateBookingData("name", e.target.value)}
                      placeholder="John Doe"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => updateBookingData("email", e.target.value)}
                      placeholder="john@company.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => updateBookingData("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                    <Input
                      value={bookingData.company}
                      onChange={(e) => updateBookingData("company", e.target.value)}
                      placeholder="Your Company"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Description</label>
                  <Textarea
                    value={bookingData.projectDescription}
                    onChange={(e) => updateBookingData("projectDescription", e.target.value)}
                    placeholder="Tell us about your project goals and what you'd like to discuss..."
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Service:</span>
                      <span className="text-white">
                        {consultationTypes.find((c) => c.id === bookingData.consultationType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expert:</span>
                      <span className="text-white">
                        {teamMembers.find((m) => m.id === bookingData.teamMember)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Date & Time:</span>
                      <span className="text-white">
                        {bookingData.date && new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Meeting Type:</span>
                      <span className="text-white">
                        {bookingData.meetingType === "video" ? "Video Call" : "Phone Call"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !bookingData.consultationType) ||
                    (currentStep === 2 && !bookingData.teamMember) ||
                    (currentStep === 3 && (!bookingData.date || !bookingData.time))
                  }
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !bookingData.name || !bookingData.email}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
