import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Building2, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminLeadsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Verify admin access
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (!profile || !["ceo", "admin"].includes(profile.role)) {
    redirect("/dashboard")
  }

  // Fetch leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  const leadStats = {
    total: leads?.length || 0,
    new: leads?.filter((l) => l.status === "new").length || 0,
    contacted: leads?.filter((l) => l.status === "contacted").length || 0,
    qualified: leads?.filter((l) => l.status === "qualified").length || 0,
    closed: leads?.filter((l) => l.status === "closed").length || 0,
  }

  const statusConfig = {
    new: { color: "bg-blue-500", label: "New", icon: Clock },
    contacted: { color: "bg-yellow-500", label: "Contacted", icon: Mail },
    qualified: { color: "bg-purple-500", label: "Qualified", icon: CheckCircle },
    closed: { color: "bg-green-500", label: "Closed", icon: CheckCircle },
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Management</h1>
            <p className="text-slate-600 mt-2">Track and manage all incoming leads</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total Leads", value: leadStats.total, color: "from-blue-500/10" },
              { label: "New", value: leadStats.new, color: "from-blue-500/10" },
              { label: "Contacted", value: leadStats.contacted, color: "from-yellow-500/10" },
              { label: "Qualified", value: leadStats.qualified, color: "from-purple-500/10" },
              { label: "Closed", value: leadStats.closed, color: "from-green-500/10" },
            ].map((stat) => (
              <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} to-transparent border-blue-500/20`}>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leads Table */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>All Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Company</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads && leads.length > 0 ? (
                      leads.map((lead) => {
                        const config = statusConfig[lead.status as keyof typeof statusConfig] || statusConfig.new
                        return (
                          <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                            <td className="py-3 px-4 text-slate-900">{lead.name}</td>
                            <td className="py-3 px-4 text-slate-600">{lead.email}</td>
                            <td className="py-3 px-4 text-slate-600">{lead.company || "-"}</td>
                            <td className="py-3 px-4 text-slate-600">{lead.service_interest || "-"}</td>
                            <td className="py-3 px-4">
                              <Badge className={`${config.color} text-white border-0`}>{config.label}</Badge>
                            </td>
                            <td className="py-3 px-4 text-slate-600 text-sm">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          No leads yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Leads Details */}
          {leads && leads.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Recent Lead Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                          <p className="text-sm text-slate-600">{lead.company || "No company"}</p>
                        </div>
                        <Badge className={`${statusConfig[lead.status as keyof typeof statusConfig]?.color || statusConfig.new.color} text-white border-0`}>
                          {statusConfig[lead.status as keyof typeof statusConfig]?.label || "New"}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.service_interest && (
                          <div className="flex items-start gap-2 text-slate-600">
                            <Building2 className="w-4 h-4 mt-1" />
                            <span>Interested in: {lead.service_interest}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2 text-slate-600">
                          <MessageSquare className="w-4 h-4 mt-1" />
                          <p>{lead.message}</p>
                        </div>
                        <div className="text-xs text-slate-500 mt-3">
                          Submitted: {new Date(lead.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
