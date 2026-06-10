import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowUp, ArrowDown, DollarSign, Users, FolderOpen, FileText } from "lucide-react"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch analytics data
  const [
    { data: profile },
    { data: customers },
    { data: projects },
    { data: invoices },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("customers").select("id, created_at, status").eq("user_id", user.id),
    supabase.from("projects").select("id, created_at, status, budget").eq("user_id", user.id),
    supabase.from("invoices").select("id, created_at, total, status").eq("user_id", user.id),
  ])

  // Calculate metrics
  const totalRevenue = invoices?.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0) || 0
  const activeProjects = projects?.filter((p) => p.status === "active").length || 0
  const totalCustomers = customers?.length || 0
  const paidInvoices = invoices?.filter((i) => i.status === "paid").length || 0

  // Prepare chart data - Revenue over time
  const revenueByMonth = invoices
    ?.reduce((acc: any, inv: any) => {
      if (!inv.created_at) return acc
      const month = new Date(inv.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      })
      const existing = acc.find((m: any) => m.month === month)
      if (existing) {
        existing.revenue += Number(inv.total) || 0
      } else {
        acc.push({ month, revenue: Number(inv.total) || 0 })
      }
      return acc
    }, [])
    .sort(
      (a: any, b: any) =>
        new Date(`${a.month} 2024`).getTime() - new Date(`${b.month} 2024`).getTime()
    )
    .slice(-6) || []

  // Project status distribution
  const projectStatusData = [
    { name: "Active", value: projects?.filter((p) => p.status === "active").length || 0 },
    { name: "Completed", value: projects?.filter((p) => p.status === "completed").length || 0 },
    { name: "On Hold", value: projects?.filter((p) => p.status === "on_hold").length || 0 },
  ]

  // Invoice status data
  const invoiceStatusData = [
    { name: "Paid", value: invoices?.filter((i) => i.status === "paid").length || 0 },
    { name: "Pending", value: invoices?.filter((i) => i.status === "pending").length || 0 },
    { name: "Overdue", value: invoices?.filter((i) => i.status === "overdue").length || 0 },
  ]

  const colors = ["#3b82f6", "#8b5cf6", "#ec4899"]

  const StatCard = ({
    icon: Icon,
    label,
    value,
    change,
    isPositive,
  }: {
    icon: React.ComponentType<any>
    label: string
    value: string | number
    change?: number
    isPositive?: boolean
  }) => (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{label}</CardTitle>
        <Icon className="h-5 w-5 text-blue-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-2 text-xs">
            {isPositive ? (
              <ArrowUp className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : "text-red-500"}>{Math.abs(change)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics & Insights</h1>
            <p className="text-slate-600 mt-2">Real-time business metrics and performance data</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={DollarSign}
              label="Total Revenue"
              value={`$${totalRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
            />
            <StatCard icon={Users} label="Total Customers" value={totalCustomers} />
            <StatCard icon={FolderOpen} label="Active Projects" value={activeProjects} />
            <StatCard icon={FileText} label="Paid Invoices" value={paidInvoices} />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Over Time */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(20,20,30,0.8)", border: "none", borderRadius: "8px" }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      dot={{ fill: "#3b82f6", r: 4 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Project Status Distribution */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {colors.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(20,20,30,0.8)", border: "none", borderRadius: "8px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Invoice Status */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle>Invoice Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={invoiceStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "rgba(20,20,30,0.8)", border: "none", borderRadius: "8px" }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Average Invoice Value</span>
                    <span className="text-lg font-bold text-white">
                      ${invoices && invoices.length > 0
                        ? (totalRevenue / invoices.length).toLocaleString("en-US", { maximumFractionDigits: 2 })
                        : "0"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Collection Rate</span>
                    <span className="text-lg font-bold text-green-400">
                      {invoices && invoices.length > 0 ? ((paidInvoices / invoices.length) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Invoices</span>
                    <span className="text-lg font-bold text-white">{invoices?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Projects</span>
                    <span className="text-lg font-bold text-white">{projects?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
