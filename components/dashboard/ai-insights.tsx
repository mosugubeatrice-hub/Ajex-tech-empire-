"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import { useState, useEffect } from "react"

interface AIInsightsProps {
  customers: any[]
  projects: any[]
  invoices: any[]
}

export function AIInsights({ customers, projects, invoices }: AIInsightsProps) {
  const [insights, setInsights] = useState<any[]>([])

  useEffect(() => {
    // Generate AI insights based on business data
    const generateInsights = () => {
      const newInsights = []

      // Revenue trend insight
      const paidInvoices = invoices.filter((inv) => inv.status === "paid")
      if (paidInvoices.length > 0) {
        const avgRevenue = paidInvoices.reduce((sum, inv) => sum + inv.total, 0) / paidInvoices.length
        newInsights.push({
          type: "revenue",
          icon: TrendingUp,
          title: "Revenue Trend",
          message: `Your average invoice value is $${avgRevenue.toFixed(0)}. Consider upselling to increase this by 15-20%.`,
          priority: "medium",
        })
      }

      // Project management insight
      const overdueProjects = projects.filter(
        (project) => project.end_date && new Date(project.end_date) < new Date() && project.status !== "completed",
      )
      if (overdueProjects.length > 0) {
        newInsights.push({
          type: "projects",
          icon: AlertTriangle,
          title: "Overdue Projects",
          message: `You have ${overdueProjects.length} overdue project(s). Review timelines and resource allocation.`,
          priority: "high",
        })
      }

      // Customer engagement insight
      if (customers.length > 0) {
        newInsights.push({
          type: "customers",
          icon: Lightbulb,
          title: "Customer Growth",
          message: `You have ${customers.length} customers. Consider implementing a referral program to boost growth.`,
          priority: "low",
        })
      }

      // Cash flow insight
      const pendingInvoices = invoices.filter((inv) => inv.status === "sent" || inv.status === "overdue")
      if (pendingInvoices.length > 0) {
        const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.total, 0)
        newInsights.push({
          type: "cashflow",
          icon: AlertTriangle,
          title: "Cash Flow Alert",
          message: `$${pendingAmount.toLocaleString()} in pending invoices. Follow up on overdue payments.`,
          priority: "high",
        })
      }

      setInsights(newInsights.slice(0, 3)) // Show top 3 insights
    }

    generateInsights()
  }, [customers, projects, invoices])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <insight.icon className="h-5 w-5 text-slate-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{insight.title}</h4>
                    <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{insight.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>AI insights will appear as you add more business data.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
