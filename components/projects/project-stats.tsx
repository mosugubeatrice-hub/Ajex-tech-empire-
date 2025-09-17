import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Clock, CheckCircle, AlertTriangle, DollarSign } from "lucide-react"

interface ProjectStatsProps {
  projects: any[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length
  const activeProjects = projects.filter((p) => p.status === "in-progress" || p.status === "planning").length
  const completedProjects = projects.filter((p) => p.status === "completed").length
  const overdueProjects = projects.filter(
    (p) => p.end_date && new Date(p.end_date) < new Date() && p.status !== "completed",
  ).length

  const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0)

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      description: "All projects",
      color: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: Clock,
      description: "In progress",
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: completedProjects,
      icon: CheckCircle,
      description: "Successfully finished",
      color: "text-green-600",
    },
    {
      title: "Overdue",
      value: overdueProjects,
      icon: AlertTriangle,
      description: "Need attention",
      color: overdueProjects > 0 ? "text-red-600" : "text-slate-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}

      {/* Total Budget Card */}
      <Card className="border-0 shadow-sm md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Project Value</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">${totalBudget.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">Combined budget of all projects</p>
        </CardContent>
      </Card>
    </div>
  )
}
