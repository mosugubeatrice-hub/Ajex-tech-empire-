import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, Plus, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

interface CustomerProjectsProps {
  projects: any[]
  customerId: string
}

export function CustomerProjects({ projects, customerId }: CustomerProjectsProps) {
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

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="h-5 w-5" />
            <span>Projects ({projects.length})</span>
          </CardTitle>
          <Link href={`/projects/new?customer=${customerId}`}>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{project.name}</h4>
                    {project.description && <p className="text-sm text-slate-600 mt-1">{project.description}</p>}
                  </div>
                  <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                </div>

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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No projects yet</p>
            <p className="text-sm">Create a project for this customer</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
