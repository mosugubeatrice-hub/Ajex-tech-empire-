import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { ClientDashboard } from "@/components/client-dashboard"

export const dynamic = "force-dynamic"

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ScrollProgress />
      <Navigation />

      <div className="pt-32 pb-20">
        <ClientDashboard />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
