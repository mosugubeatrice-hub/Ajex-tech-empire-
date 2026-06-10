import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Mail, Lock, Bell, Users, FileText, Shield } from "lucide-react"

export default async function AdminSettingsPage() {
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

  // Fetch system stats for dashboard
  const [
    { data: allUsers },
    { data: allCustomers },
    { data: allProjects },
    { data: allInvoices },
  ] = await Promise.all([
    supabase.from("profiles").select("id"),
    supabase.from("customers").select("id"),
    supabase.from("projects").select("id"),
    supabase.from("invoices").select("id"),
  ])

  const systemStats = {
    totalUsers: allUsers?.length || 0,
    totalCustomers: allCustomers?.length || 0,
    totalProjects: allProjects?.length || 0,
    totalInvoices: allInvoices?.length || 0,
  }

  const SettingSection = ({
    icon: Icon,
    title,
    description,
    children,
  }: {
    icon: React.ComponentType<any>
    title: string
    description: string
    children: React.ReactNode
  }) => (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Settings className="h-8 w-8 text-blue-600" />
                System Settings
              </h1>
              <p className="text-slate-600 mt-2">Configure and manage your AJEx Tech Empire system</p>
            </div>
            <Badge variant="secondary">{profile?.role === "ceo" ? "CEO Access" : "Admin Access"}</Badge>
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: systemStats.totalUsers },
              { label: "Total Customers", value: systemStats.totalCustomers },
              { label: "Total Projects", value: systemStats.totalProjects },
              { label: "Total Invoices", value: systemStats.totalInvoices },
            ].map((stat) => (
              <Card key={stat.label} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            <SettingSection
              icon={Mail}
              title="Email Configuration"
              description="Configure email notifications and communication settings"
            >
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  Email notifications are currently in development. Coming soon!
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      disabled
                      value={user.email || ""}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Provider</label>
                    <select
                      disabled
                      defaultValue="sendgrid"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-700"
                    >
                      <option>SendGrid</option>
                      <option>Mailgun</option>
                      <option>Brevo</option>
                    </select>
                  </div>
                </div>
              </div>
            </SettingSection>

            <SettingSection
              icon={Lock}
              title="Security Settings"
              description="Manage authentication and access control"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Two-Factor Authentication</p>
                    <Badge className="bg-green-600 text-white mt-2">Enabled</Badge>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Row Level Security</p>
                    <Badge className="bg-green-600 text-white mt-2">Enabled</Badge>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                  <p className="font-medium mb-2">Security Features</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Password hashing with bcrypt</li>
                    <li>JWT token authentication</li>
                    <li>Session-based security</li>
                    <li>API rate limiting enabled</li>
                  </ul>
                </div>
              </div>
            </SettingSection>

            <SettingSection
              icon={Bell}
              title="Notification Preferences"
              description="Configure how you receive updates and alerts"
            >
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    { name: "New Lead Notifications", enabled: true },
                    { name: "Invoice Reminders", enabled: true },
                    { name: "Project Updates", enabled: true },
                    { name: "Weekly Summary Reports", enabled: false },
                  ].map((pref) => (
                    <label key={pref.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        defaultChecked={pref.enabled}
                        disabled
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-slate-700">{pref.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </SettingSection>

            <SettingSection
              icon={Users}
              title="User Management"
              description="Manage team members and access control"
            >
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <p className="font-medium mb-2">User Roles Available</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-medium">CEO</p>
                      <p className="text-xs">Full system access</p>
                    </div>
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-xs">Full access except settings</p>
                    </div>
                    <div>
                      <p className="font-medium">Worker</p>
                      <p className="text-xs">Project & task access</p>
                    </div>
                    <div>
                      <p className="font-medium">Client</p>
                      <p className="text-xs">View own projects</p>
                    </div>
                  </div>
                </div>
                <Button disabled className="w-full">
                  Manage Users (Coming Soon)
                </Button>
              </div>
            </SettingSection>

            <SettingSection
              icon={FileText}
              title="Data & Backups"
              description="Manage system data and backup settings"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Auto Backups</p>
                    <Badge variant="secondary" className="mt-2">
                      Daily at 2 AM UTC
                    </Badge>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Retention</p>
                    <Badge variant="secondary" className="mt-2">
                      30 days
                    </Badge>
                  </div>
                </div>
                <Button disabled className="w-full">
                  Download Backup (Coming Soon)
                </Button>
              </div>
            </SettingSection>

            <SettingSection
              icon={Shield}
              title="Compliance & Legal"
              description="GDPR, privacy, and compliance settings"
            >
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900">GDPR Compliance</p>
                    <p className="text-xs text-green-800 mt-1">All data processing complies with GDPR requirements</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Data Encryption</p>
                    <p className="text-xs text-green-800 mt-1">All data encrypted in transit and at rest</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Privacy Policy</p>
                    <p className="text-xs text-green-800 mt-1">Privacy policy available at /privacy</p>
                  </div>
                </div>
              </div>
            </SettingSection>
          </div>
        </div>
      </main>
    </div>
  )
}
