import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InvoiceView } from "@/components/invoices/invoice-view"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface InvoicePageProps {
  params: Promise<{ id: string }>
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch invoice data with related information
  const [{ data: profile }, { data: invoice }, { data: invoiceItems }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("invoices")
      .select("*, customers(name, email, company, address), projects(name)")
      .eq("id", id)
      .eq("user_id", user.id)
      .single(),
    supabase.from("invoice_items").select("*").eq("invoice_id", id),
  ])

  if (!invoice) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link href="/invoices">
              <ArrowLeft className="h-6 w-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{invoice.invoice_number}</h1>
              <p className="text-slate-600 mt-2">Invoice details and payment status</p>
            </div>
          </div>

          {/* Invoice View */}
          <InvoiceView invoice={invoice} invoiceItems={invoiceItems || []} profile={profile} />
        </div>
      </main>
    </div>
  )
}
