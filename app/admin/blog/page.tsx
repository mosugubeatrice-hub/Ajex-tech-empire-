import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { AIBlogGenerator } from "@/components/ai-blog-generator"

export default function AdminBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ScrollProgress />
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AI Blog Management</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Generate, optimize, and schedule high-quality blog content with AI-powered automation
            </p>
          </div>

          <AIBlogGenerator />
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
