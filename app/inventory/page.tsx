import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InventoryTable } from "@/components/inventory/inventory-table"
import { InventoryStats } from "@/components/inventory/inventory-stats"
import { Button } from "@/components/ui/button"
import { Plus, Package } from "lucide-react"
import Link from "next/link"

export default async function InventoryPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile and products
  const [{ data: profile }, { data: products }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("products").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
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
                <Package className="h-8 w-8 text-blue-600" />
                <span>Inventory Management</span>
              </h1>
              <p className="text-slate-600 mt-2">Track your products, stock levels, and inventory value</p>
            </div>
            <Link href="/inventory/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <InventoryStats products={products || []} />

          {/* Inventory Table */}
          <InventoryTable products={products || []} />
        </div>
      </main>
    </div>
  )
}
