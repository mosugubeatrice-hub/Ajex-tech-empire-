import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InvoiceForm } from "@/components/invoices/invoice-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewInvoicePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile, customers, projects, and products
  const [{ data: profile }, { data: customers }, { data: projects }, { data: products }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("customers").select("id, name, company, email").eq("user_id", user.id).order("name"),
    supabase.from("projects").select("id, name, customer_id").eq("user_id", user.id).order("name"),
    supabase
      .from("products")
      .select("id, name, price, description")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("name"),
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link href="/invoices">
              <ArrowLeft className="h-6 w-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Create New Invoice</h1>
              <p className="text-slate-600 mt-2">Generate a professional invoice for your client</p>
            </div>
          </div>

          {/* Form */}
          <InvoiceForm
            customers={customers || []}
            projects={projects || []}
            products={products || []}
            profile={profile}
          />
        </div>
      </main>
    </div>
  )
}
