import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, UserPlus, FileText, Package, FolderOpen } from "lucide-react"

export function RecentActivity() {
  // Mock recent activity data - in a real app, this would come from an activity log
  const activities = [
    {
      type: "customer",
      icon: UserPlus,
      title: "New customer added",
      description: "John Smith from Acme Corp",
      time: "2 hours ago",
      color: "text-green-600",
    },
    {
      type: "invoice",
      icon: FileText,
      title: "Invoice sent",
      description: "Invoice #INV-001 sent to client",
      time: "4 hours ago",
      color: "text-blue-600",
    },
    {
      type: "project",
      icon: FolderOpen,
      title: "Project updated",
      description: "Website redesign moved to in-progress",
      time: "6 hours ago",
      color: "text-purple-600",
    },
    {
      type: "inventory",
      icon: Package,
      title: "Low stock alert",
      description: "Product XYZ is running low",
      time: "1 day ago",
      color: "text-orange-600",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-slate-600" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-slate-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                <p className="text-sm text-slate-500">{activity.description}</p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
