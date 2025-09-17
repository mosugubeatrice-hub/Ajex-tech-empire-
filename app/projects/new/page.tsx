import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectForm } from "@/components/projects/project-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewProjectPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile and customers
  const [{ data: profile }, { data: customers }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("customers").select("id, name, company").eq("user_id", user.id).order("name"),
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link href="/projects">
              <ArrowLeft className="h-6 w-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Create New Project</h1>
              <p className="text-slate-600 mt-2">Set up a new project with timeline and budget</p>
            </div>
          </div>

          {/* Form */}
          <ProjectForm customers={customers || []} />
        </div>
      </main>
    </div>
  )
}
