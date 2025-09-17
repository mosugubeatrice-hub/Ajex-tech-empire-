import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Building, TrendingUp } from "lucide-react"

interface CustomerStatsProps {
  customers: any[]
}

export function CustomerStats({ customers }: CustomerStatsProps) {
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const prospects = customers.filter((c) => c.status === "prospect").length
  const companiesCount = new Set(customers.filter((c) => c.company).map((c) => c.company)).size

  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      description: "All customers",
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      icon: TrendingUp,
      description: "Currently active",
      color: "text-green-600",
    },
    {
      title: "Prospects",
      value: prospects,
      icon: UserPlus,
      description: "Potential customers",
      color: "text-yellow-600",
    },
    {
      title: "Companies",
      value: companiesCount,
      icon: Building,
      description: "Unique companies",
      color: "text-purple-600",
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
    </div>
  )
}
