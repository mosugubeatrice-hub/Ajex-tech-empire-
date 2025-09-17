import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"

interface ProjectTimelineProps {
  project: any
}

export function ProjectTimeline({ project }: ProjectTimelineProps) {
  // Generate timeline events based on project data
  const timelineEvents = [
    {
      title: "Project Created",
      description: "Project was initialized and added to the system",
      date: project.created_at,
      type: "created",
      icon: Clock,
      completed: true,
    },
    {
      title: "Planning Phase",
      description: "Project requirements and scope definition",
      date: project.start_date || project.created_at,
      type: "planning",
      icon: Clock,
      completed: project.status !== "planning",
    },
    {
      title: "Development Started",
      description: "Active work on project deliverables",
      date: project.start_date,
      type: "in-progress",
      icon: Clock,
      completed: project.status === "completed" || project.status === "in-progress",
    },
    {
      title: "Project Completion",
      description: "Final deliverables and project closure",
      date: project.end_date,
      type: "completed",
      icon: CheckCircle,
      completed: project.status === "completed",
    },
  ].filter((event) => event.date) // Only show events with dates

  const getEventColor = (type: string, completed: boolean) => {
    if (completed) {
      return "text-green-600 bg-green-100"
    }
    switch (type) {
      case "created":
        return "text-blue-600 bg-blue-100"
      case "planning":
        return "text-yellow-600 bg-yellow-100"
      case "in-progress":
        return "text-blue-600 bg-blue-100"
      case "completed":
        return "text-green-600 bg-green-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Project Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${getEventColor(event.type, event.completed)}`}>
                <event.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-slate-900">{event.title}</h4>
                  {event.completed && <Badge className="bg-green-100 text-green-800 border-green-200">Done</Badge>}
                </div>
                <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                <p className="text-xs text-slate-400">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}

          {/* Project Status Alert */}
          {project.end_date && new Date(project.end_date) < new Date() && project.status !== "completed" && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-900">Project Overdue</h4>
                  <p className="text-sm text-red-700">
                    This project was due on {new Date(project.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
