import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { AIContentOptimizer } from "@/components/ai-content-optimizer"

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ScrollProgress />
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AI Content Optimization</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Analyze and optimize your website content with AI-powered insights for better engagement and conversions
            </p>
          </div>

          <AIContentOptimizer />
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
