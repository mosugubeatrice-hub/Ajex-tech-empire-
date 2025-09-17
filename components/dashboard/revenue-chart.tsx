"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign } from "lucide-react"

interface RevenueChartProps {
  invoices: any[]
}

export function RevenueChart({ invoices }: RevenueChartProps) {
  // Process invoice data for the chart
  const processRevenueData = () => {
    const monthlyRevenue = new Map()

    invoices
      .filter((invoice) => invoice.status === "paid" && invoice.issue_date)
      .forEach((invoice) => {
        const date = new Date(invoice.issue_date)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        const monthName = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })

        if (!monthlyRevenue.has(monthKey)) {
          monthlyRevenue.set(monthKey, { month: monthName, revenue: 0 })
        }

        monthlyRevenue.get(monthKey).revenue += invoice.total || 0
      })

    // Get last 6 months of data
    const sortedData = Array.from(monthlyRevenue.values())
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6)

    return sortedData.length > 0
      ? sortedData
      : [
          { month: "Jan 2024", revenue: 0 },
          { month: "Feb 2024", revenue: 0 },
          { month: "Mar 2024", revenue: 0 },
        ]
  }

  const data = processRevenueData()
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Revenue Overview</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-slate-500">Total Revenue</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                labelStyle={{ color: "#64748b" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} className="hover:opacity-80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
