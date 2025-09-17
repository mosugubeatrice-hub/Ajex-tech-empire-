import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react"

interface InventoryStatsProps {
  products: any[]
}

export function InventoryStats({ products }: InventoryStatsProps) {
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const lowStockProducts = products.filter((p) => p.quantity < 10 && p.quantity > 0).length
  const outOfStockProducts = products.filter((p) => p.quantity === 0).length

  const totalInventoryValue = products.reduce((sum, product) => {
    return sum + (product.cost || 0) * product.quantity
  }, 0)

  const totalRetailValue = products.reduce((sum, product) => {
    return sum + (product.price || 0) * product.quantity
  }, 0)

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      description: "All products",
      color: "text-blue-600",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: TrendingUp,
      description: "Currently selling",
      color: "text-green-600",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      icon: AlertTriangle,
      description: "Below 10 units",
      color: lowStockProducts > 0 ? "text-yellow-600" : "text-slate-400",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts,
      icon: AlertTriangle,
      description: "Need restocking",
      color: outOfStockProducts > 0 ? "text-red-600" : "text-slate-400",
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

      {/* Inventory Value Cards */}
      <Card className="border-0 shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Inventory Value (Cost)</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">${totalInventoryValue.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">Total cost of inventory</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Retail Value</CardTitle>
          <DollarSign className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">${totalRetailValue.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">Total retail value</p>
        </CardContent>
      </Card>
    </div>
  )
}
