'use client'

import { useEffect, useState } from 'react'
import { RequireRole } from '@/components/auth/require-role'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, Filter, TrendingUp, Users, DollarSign, FileText, CheckCircle, Clock } from 'lucide-react'
import { ROLES } from '@/lib/constants'

interface AnalyticsData {
  summary: Record<string, any>
  growth: Record<string, any>
  trends: Array<Record<string, any>>
  invoiceStats: Record<string, any>
  projectStats: Record<string, any>
  leadStats: Record<string, any>
}

export default function AdminReportsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)

  useEffect(() => {
    fetchAnalytics()
  }, [days])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics?days=${days}`)
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = async () => {
    if (!analytics) return

    const reportContent = `
AJEx Tech Empire - Business Report
Generated: ${new Date().toLocaleString()}
Period: Last ${days} days

EXECUTIVE SUMMARY
================
Total Customers: ${analytics.summary.totalCustomers}
Total Projects: ${analytics.summary.totalProjects}
Total Revenue: $${analytics.summary.totalRevenue.toFixed(2)}
Paid Revenue: $${analytics.summary.paidRevenue.toFixed(2)}
Pending Revenue: $${analytics.summary.pendingRevenue.toFixed(2)}

PROJECT METRICS
===============
Completed Projects: ${analytics.summary.completedProjects}
Active Projects: ${analytics.summary.activeProjects}
Total Projects: ${analytics.projectStats.total}

INVOICE METRICS
===============
Total Invoices: ${analytics.invoiceStats.total}
Paid: ${analytics.invoiceStats.paid}
Pending: ${analytics.invoiceStats.pending}
Overdue: ${analytics.invoiceStats.overdue}

LEAD & BOOKING METRICS
======================
Total Leads: ${analytics.leadStats.total}
Qualified Leads: ${analytics.leadStats.qualified}
Lead Conversion Rate: ${analytics.summary.conversionRate}%
Total Bookings: ${analytics.summary.totalBookings}

GROWTH METRICS (Last ${days} days)
=======================
New Customers: ${analytics.growth.recentCustomers}
New Projects: ${analytics.growth.recentProjects}
New Leads: ${analytics.growth.recentLeads}
    `

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent))
    element.setAttribute('download', `business-report-${new Date().toISOString().split('T')[0]}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return (
      <RequireRole allowedRoles={[ROLES.CEO, ROLES.ADMIN]}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-white text-center">Loading analytics...</div>
          </div>
        </div>
      </RequireRole>
    )
  }

  if (!analytics) {
    return (
      <RequireRole allowedRoles={[ROLES.CEO, ROLES.ADMIN]}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-white text-center">Failed to load analytics</div>
          </div>
        </div>
      </RequireRole>
    )
  }

  const pieChartData = [
    { name: 'Paid', value: analytics.summary.paidRevenue },
    { name: 'Pending', value: analytics.summary.pendingRevenue },
  ]

  const COLORS = ['#3b82f6', '#f59e0b']

  return (
    <RequireRole allowedRoles={[ROLES.CEO, ROLES.ADMIN]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Business Analytics</h1>
              <p className="text-gray-400">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex gap-3">
              <select
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last year</option>
              </select>
              <Button onClick={downloadReport} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4 mr-2" /> Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Revenue', value: `$${analytics.summary.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'from-green-500/10' },
              { label: 'Customers', value: analytics.summary.totalCustomers, icon: Users, color: 'from-blue-500/10' },
              { label: 'Projects', value: analytics.summary.totalProjects, icon: FileText, color: 'from-purple-500/10' },
              { label: 'Lead Conversion', value: `${analytics.summary.conversionRate}%`, icon: TrendingUp, color: 'from-orange-500/10' },
            ].map((metric, i) => {
              const Icon = metric.icon
              return (
                <Card key={i} className={`bg-gradient-to-br ${metric.color} to-transparent border-blue-500/20`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                        <p className="text-3xl font-bold text-white">{metric.value}</p>
                      </div>
                      <Icon className="w-8 h-8 text-gray-600" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Distribution */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Revenue Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: $${value.toFixed(0)}`} outerRadius={80} fill="#8884d8" dataKey="value">
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Invoice Stats */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Invoice Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Invoices</span>
                  <span className="text-white font-semibold">{analytics.invoiceStats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paid</span>
                  <span className="text-green-400 font-semibold">${analytics.summary.paidRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pending</span>
                  <span className="text-yellow-400 font-semibold">${analytics.summary.pendingRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Overdue</span>
                  <span className="text-red-400 font-semibold">{analytics.invoiceStats.overdue}</span>
                </div>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Project Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Projects</span>
                  <span className="text-white font-semibold">{analytics.projectStats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-green-400 font-semibold">{analytics.projectStats.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">In Progress</span>
                  <span className="text-blue-400 font-semibold">{analytics.projectStats.inProgress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">On Hold</span>
                  <span className="text-gray-400 font-semibold">{analytics.projectStats.onHold}</span>
                </div>
              </CardContent>
            </Card>

            {/* Lead Stats */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" /> Lead Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Leads</span>
                  <span className="text-white font-semibold">{analytics.leadStats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">New</span>
                  <span className="text-blue-400 font-semibold">{analytics.leadStats.new}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Qualified</span>
                  <span className="text-green-400 font-semibold">{analytics.leadStats.qualified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Closed</span>
                  <span className="text-yellow-400 font-semibold">{analytics.leadStats.closed}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RequireRole>
  )
}
