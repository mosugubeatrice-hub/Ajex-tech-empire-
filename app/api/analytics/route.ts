import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          },
        },
      }
    )

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get date range from query params
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get("days") || "30")
    const fromDate = new Date()
    fromDate.setDate(fromDate.getDate() - days)

    // Fetch all analytics data in parallel
    const [
      { data: customers, count: totalCustomers },
      { data: projects, count: totalProjects },
      { data: invoices },
      { data: leads },
      { data: bookings },
    ] = await Promise.all([
      supabase.from("customers").select("id, created_at", { count: "exact" }),
      supabase.from("projects").select("id, created_at, status", { count: "exact" }),
      supabase.from("invoices").select("id, amount, status, created_at"),
      supabase.from("leads").select("id, status, created_at"),
      supabase.from("bookings").select("id, status, created_at"),
    ])

    // Calculate revenue metrics
    const totalRevenue = (invoices || []).reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0)
    const paidInvoices = (invoices || []).filter((inv: any) => inv.status === "paid")
    const paidRevenue = paidInvoices.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0)
    const pendingRevenue = totalRevenue - paidRevenue

    // Calculate project metrics
    const completedProjects = (projects || []).filter((p: any) => p.status === "completed").length
    const activeProjects = (projects || []).filter((p: any) => p.status === "in_progress").length

    // Calculate lead metrics
    const qualifiedLeads = (leads || []).filter((l: any) => l.status === "qualified").length
    const convertedLeads = (leads || []).filter((l: any) => l.status === "closed").length
    const conversionRate = (leads || []).length > 0 ? (convertedLeads / (leads || []).length) * 100 : 0

    // Calculate growth metrics
    const recentCustomers = (customers || []).filter((c: any) => new Date(c.created_at) > fromDate).length
    const recentProjects = (projects || []).filter((p: any) => new Date(p.created_at) > fromDate).length
    const recentLeads = (leads || []).filter((l: any) => new Date(l.created_at) > fromDate).length

    // Group data by date for trend analysis
    const dateGroups: Record<string, any> = {}
    ;[...(customers || []), ...(invoices || []), ...(leads || [])].forEach((item: any) => {
      const date = new Date(item.created_at).toISOString().split("T")[0]
      if (!dateGroups[date]) {
        dateGroups[date] = { customers: 0, invoices: 0, leads: 0, revenue: 0 }
      }
      if (item.amount) {
        dateGroups[date].invoices++
        dateGroups[date].revenue += item.amount
      }
      if (!item.amount && item.id && !item.status) dateGroups[date].customers++
      if (item.service_interest || item.message) dateGroups[date].leads++
    })

    const trendData = Object.entries(dateGroups)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .slice(-days)
      .map(([date, data]: [string, any]) => ({
        date,
        ...data,
      }))

    return NextResponse.json({
      summary: {
        totalCustomers: totalCustomers || 0,
        totalProjects: totalProjects || 0,
        totalRevenue,
        paidRevenue,
        pendingRevenue,
        completedProjects,
        activeProjects,
        totalLeads: leads?.length || 0,
        qualifiedLeads,
        convertedLeads,
        conversionRate: conversionRate.toFixed(2),
        totalBookings: bookings?.length || 0,
      },
      growth: {
        recentCustomers,
        recentProjects,
        recentLeads,
        daysAnalyzed: days,
      },
      trends: trendData,
      invoiceStats: {
        total: invoices?.length || 0,
        paid: paidInvoices.length,
        pending: (invoices || []).filter((inv: any) => inv.status === "pending").length,
        overdue: (invoices || []).filter((inv: any) => inv.status === "overdue").length,
      },
      projectStats: {
        total: projects?.length || 0,
        completed: completedProjects,
        inProgress: activeProjects,
        onHold: (projects || []).filter((p: any) => p.status === "on_hold").length,
      },
      leadStats: {
        total: leads?.length || 0,
        new: (leads || []).filter((l: any) => l.status === "new").length,
        contacted: (leads || []).filter((l: any) => l.status === "contacted").length,
        qualified: qualifiedLeads,
        closed: convertedLeads,
      },
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data, timestamp } = body

    // Log analytics event (in production, you'd send to your analytics service)
    console.log("Analytics Event:", {
      event,
      data,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      referer: request.headers.get("referer"),
    })

    // Here you would typically:
    // 1. Send to Google Analytics 4
    // 2. Send to Facebook Pixel
    // 3. Send to custom analytics database
    // 4. Send to marketing automation tools

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
