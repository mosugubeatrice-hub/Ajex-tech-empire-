"use client"

import { useState, useEffect } from "react"
import { RequireRole } from "@/components/auth/require-role"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ROLES } from "@/lib/constants"

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCustomers: 0,
    totalInvoices: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <RequireRole allowedRoles={[ROLES.CEO, ROLES.ADMIN]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage AJEx Tech Empire</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Projects", value: stats.totalProjects },
              { label: "Total Customers", value: stats.totalCustomers },
              { label: "Total Invoices", value: stats.totalInvoices },
              { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}` },
            ].map((stat, i) => (
              <Card key={i} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{loading ? "..." : stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Management Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Users", href: "/admin/users", description: "Manage user accounts and roles" },
              { title: "Projects", href: "/admin/projects", description: "Manage portfolio projects" },
              { title: "Blog Posts", href: "/admin/blog", description: "Manage blog content" },
              { title: "Testimonials", href: "/admin/testimonials", description: "Manage client testimonials" },
            ].map((section, i) => (
              <Card key={i} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{section.description}</p>
                  <Link href={section.href}>
                    <Button className="bg-blue-600 hover:bg-blue-700">Manage</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </RequireRole>
  )
}
