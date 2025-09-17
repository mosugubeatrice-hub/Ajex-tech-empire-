import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CustomerDetails } from "@/components/customers/customer-details"
import { CustomerProjects } from "@/components/customers/customer-projects"
import { CustomerInvoices } from "@/components/customers/customer-invoices"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CustomerPageProps {
  params: Promise<{ id: string }>
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch customer data
  const [{ data: profile }, { data: customer }, { data: projects }, { data: invoices }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("customers").select("*").eq("id", id).eq("user_id", user.id).single(),
    supabase.from("projects").select("*").eq("customer_id", id).eq("user_id", user.id),
    supabase.from("invoices").select("*").eq("customer_id", id).eq("user_id", user.id),
  ])

  if (!customer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link href="/customers">
              <ArrowLeft className="h-6 w-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{customer.name}</h1>
              <p className="text-slate-600 mt-2">Customer details and relationship history</p>
            </div>
          </div>

          {/* Customer Details */}
          <CustomerDetails customer={customer} />

          {/* Projects and Invoices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CustomerProjects projects={projects || []} customerId={customer.id} />
            <CustomerInvoices invoices={invoices || []} customerId={customer.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
