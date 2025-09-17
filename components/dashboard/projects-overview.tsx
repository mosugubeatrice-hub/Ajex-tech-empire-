import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FolderOpen, Calendar, DollarSign } from "lucide-react"

interface ProjectsOverviewProps {
  projects: any[]
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "on-hold":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getProgressValue = (project: any) => {
    switch (project.status) {
      case "completed":
        return 100
      case "in-progress":
        return 60
      case "planning":
        return 20
      case "on-hold":
        return 30
      default:
        return 0
    }
  }

  const recentProjects = projects.slice(0, 5)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FolderOpen className="h-5 w-5 text-blue-600" />
          <span>Recent Projects</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentProjects.length > 0 ? (
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{project.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                </div>

                <div className="space-y-3">
                  <Progress value={getProgressValue(project)} className="h-2" />

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                      {project.end_date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due {new Date(project.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.budget && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${project.budget.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <span>{getProgressValue(project)}% complete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No projects yet. Create your first project to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
