import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { BookingSystem } from "@/components/booking-system"
import { Badge } from "@/components/ui/badge"

export default function BookConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ScrollProgress />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2 text-sm font-medium">
            Free Consultation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Book Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Strategy Session
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty mb-8">
            Schedule a free 30-minute consultation with our experts to discuss your project goals, timeline, and how we
            can help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Booking System */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <BookingSystem />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
