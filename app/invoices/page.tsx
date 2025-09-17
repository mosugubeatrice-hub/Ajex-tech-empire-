import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InvoicesTable } from "@/components/invoices/invoices-table"
import { InvoiceStats } from "@/components/invoices/invoice-stats"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"
import Link from "next/link"

export default async function InvoicesPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile, invoices, customers, and projects
  const [{ data: profile }, { data: invoices }, { data: customers }, { data: projects }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("invoices")
      .select("*, customers(name, company), projects(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase.from("customers").select("id, name, company").eq("user_id", user.id),
    supabase.from("projects").select("id, name").eq("user_id", user.id),
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <span>Invoice Management</span>
              </h1>
              <p className="text-slate-600 mt-2">Create, send, and track your invoices</p>
            </div>
            <Link href="/invoices/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Invoice</span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <InvoiceStats invoices={invoices || []} />

          {/* Invoices Table */}
          <InvoicesTable invoices={invoices || []} customers={customers || []} projects={projects || []} />
        </div>
      </main>
    </div>
  )
}
