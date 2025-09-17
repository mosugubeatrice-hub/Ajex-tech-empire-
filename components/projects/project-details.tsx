import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FolderOpen, User, Calendar, DollarSign, Flag, FileText, Edit } from "lucide-react"

interface ProjectDetailsProps {
  project: any
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
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

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Project Information</span>
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
            <Badge className={getPriorityColor(project.priority)}>{project.priority} priority</Badge>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Progress</span>
              <span className="text-sm text-slate-500">{getProgressValue(project)}% complete</span>
            </div>
            <Progress value={getProgressValue(project)} className="h-3" />
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Client Info */}
            <div className="space-y-4">
              {project.customers && (
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Client</p>
                    <p className="font-medium text-slate-900">{project.customers.name}</p>
                    {project.customers.company && <p className="text-sm text-slate-600">{project.customers.company}</p>}
                  </div>
                </div>
              )}

              {project.budget && (
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Budget</p>
                    <p className="font-medium text-slate-900">${project.budget.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {project.start_date && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Start Date</p>
                    <p className="font-medium text-slate-900">{new Date(project.start_date).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {project.end_date && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-medium text-slate-900">{new Date(project.end_date).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Flag className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Priority</p>
                  <p className="font-medium text-slate-900 capitalize">{project.priority}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Created</p>
                  <p className="font-medium text-slate-900">{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-2">Description</p>
                  <p className="text-slate-700 leading-relaxed">{project.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
