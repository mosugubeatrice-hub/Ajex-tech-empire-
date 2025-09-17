import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectsTable } from "@/components/projects/projects-table"
import { ProjectStats } from "@/components/projects/project-stats"
import { Button } from "@/components/ui/button"
import { Plus, FolderOpen } from "lucide-react"
import Link from "next/link"

export default async function ProjectsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile, projects, and customers
  const [{ data: profile }, { data: projects }, { data: customers }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("projects")
      .select("*, customers(name)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase.from("customers").select("id, name").eq("user_id", user.id),
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
                <FolderOpen className="h-8 w-8 text-blue-600" />
                <span>Project Management</span>
              </h1>
              <p className="text-slate-600 mt-2">Track and manage your projects from start to finish</p>
            </div>
            <Link href="/projects/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <ProjectStats projects={projects || []} />

          {/* Projects Table */}
          <ProjectsTable projects={projects || []} customers={customers || []} />
        </div>
      </main>
    </div>
  )
}
