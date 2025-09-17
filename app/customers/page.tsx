import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CustomersTable } from "@/components/customers/customers-table"
import { CustomerStats } from "@/components/customers/customer-stats"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

export default async function CustomersPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile and customers
  const [{ data: profile }, { data: customers }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("customers").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
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
                <Users className="h-8 w-8 text-blue-600" />
                <span>Customer Management</span>
              </h1>
              <p className="text-slate-600 mt-2">Manage your customer relationships and track interactions</p>
            </div>
            <Link href="/customers/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Customer</span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <CustomerStats customers={customers || []} />

          {/* Customers Table */}
          <CustomersTable customers={customers || []} />
        </div>
      </main>
    </div>
  )
}
