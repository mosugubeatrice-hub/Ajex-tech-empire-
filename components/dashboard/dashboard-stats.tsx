import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FolderOpen, Package, FileText, TrendingUp, TrendingDown } from "lucide-react"

interface DashboardStatsProps {
  customers: any[]
  projects: any[]
  products: any[]
  invoices: any[]
}

export function DashboardStats({ customers, projects, products, invoices }: DashboardStatsProps) {
  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + (invoice.total || 0), 0)

  const activeProjects = projects.filter(
    (project) => project.status === "in-progress" || project.status === "planning",
  ).length

  const pendingInvoices = invoices.filter((invoice) => invoice.status === "sent" || invoice.status === "overdue").length

  const lowStockProducts = products.filter((product) => product.quantity < 10).length

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      description: "from last month",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: FolderOpen,
      change: "+8%",
      changeType: "positive" as const,
      description: "currently running",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: FileText,
      change: "+23%",
      changeType: "positive" as const,
      description: "this month",
    },
    {
      title: "Low Stock Items",
      value: lowStockProducts,
      icon: Package,
      change: lowStockProducts > 0 ? "Attention needed" : "All good",
      changeType: lowStockProducts > 0 ? ("negative" as const) : ("positive" as const),
      description: "products below 10 units",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              {stat.changeType === "positive" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
              <span className="text-slate-500">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
