import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/client"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get total projects
    const { count: projectsCount } = await supabase.from("projects").select("*", { count: "exact", head: true })

    // Get total customers
    const { count: customersCount } = await supabase.from("customers").select("*", { count: "exact", head: true })

    // Get total invoices
    const { count: invoicesCount } = await supabase.from("invoices").select("*", { count: "exact", head: true })

    // Get total revenue from invoices
    const { data: invoices } = await supabase.from("invoices").select("total")

    const totalRevenue = invoices?.reduce((sum, invoice) => sum + (invoice.total || 0), 0) || 0

    const stats = {
      totalProjects: projectsCount || 0,
      totalCustomers: customersCount || 0,
      totalInvoices: invoicesCount || 0,
      totalRevenue: totalRevenue,
    }

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error("Stats fetch error:", error)
    // Return default stats on error instead of failing
    return NextResponse.json(
      {
        totalProjects: 0,
        totalCustomers: 0,
        totalInvoices: 0,
        totalRevenue: 0,
      },
      { status: 200 },
    )
  }
}
