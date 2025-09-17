import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserPlus, FolderPlus, FileText, Package } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "New Customer",
      icon: UserPlus,
      href: "/customers/new",
      description: "Add a new customer",
    },
    {
      title: "Create Project",
      icon: FolderPlus,
      href: "/projects/new",
      description: "Start a new project",
    },
    {
      title: "New Invoice",
      icon: FileText,
      href: "/invoices/new",
      description: "Create an invoice",
    },
    {
      title: "Add Product",
      icon: Package,
      href: "/inventory/new",
      description: "Add to inventory",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Button variant="ghost" className="w-full justify-start h-auto p-3">
              <action.icon className="h-4 w-4 mr-3 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-slate-500">{action.description}</div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
