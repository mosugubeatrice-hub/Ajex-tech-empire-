import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ClientLoginForm } from "@/components/client-login-form"

export default function ClientLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <ClientLoginForm />
        </div>
      </div>

      <Footer />
    </div>
  )
}
