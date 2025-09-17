import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectDetails } from "@/components/projects/project-details"
import { ProjectTimeline } from "@/components/projects/project-timeline"
import { ProjectInvoices } from "@/components/projects/project-invoices"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch project data
  const [{ data: profile }, { data: project }, { data: invoices }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("projects").select("*, customers(name, email, company)").eq("id", id).eq("user_id", user.id).single(),
    supabase.from("invoices").select("*").eq("project_id", id).eq("user_id", user.id),
  ])

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link href="/projects">
              <ArrowLeft className="h-6 w-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
              <p className="text-slate-600 mt-2">Project details and progress tracking</p>
            </div>
          </div>

          {/* Project Details */}
          <ProjectDetails project={project} />

          {/* Timeline and Invoices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectTimeline project={project} />
            <ProjectInvoices invoices={invoices || []} projectId={project.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
