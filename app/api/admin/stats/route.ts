import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch real stats from Supabase
    // For now, return mock data
    const stats = {
      totalProjects: 50,
      totalCustomers: 35,
      totalInvoices: 127,
      totalRevenue: 450000,
    }

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
