import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface InvoiceStatsProps {
  invoices: any[]
}

export function InvoiceStats({ invoices }: InvoiceStatsProps) {
  const totalInvoices = invoices.length
  const paidInvoices = invoices.filter((inv) => inv.status === "paid")
  const pendingInvoices = invoices.filter((inv) => inv.status === "sent")
  const overdueInvoices = invoices.filter(
    (inv) => inv.due_date && new Date(inv.due_date) < new Date() && inv.status !== "paid",
  )

  const totalRevenue = paidInvoices.reduce((sum, inv) => sum + inv.total, 0)
  const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.total, 0)
  const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.total, 0)

  const stats = [
    {
      title: "Total Invoices",
      value: totalInvoices,
      icon: FileText,
      description: "All invoices",
      color: "text-blue-600",
    },
    {
      title: "Paid Invoices",
      value: paidInvoices.length,
      icon: CheckCircle,
      description: "Successfully paid",
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: pendingInvoices.length,
      icon: Clock,
      description: "Awaiting payment",
      color: "text-yellow-600",
    },
    {
      title: "Overdue",
      value: overdueInvoices.length,
      icon: AlertTriangle,
      description: "Past due date",
      color: overdueInvoices.length > 0 ? "text-red-600" : "text-slate-400",
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

      {/* Revenue Cards */}
      <Card className="border-0 shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">From paid invoices</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Outstanding Amount</CardTitle>
          <DollarSign className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">${(pendingAmount + overdueAmount).toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            ${pendingAmount.toLocaleString()} pending, ${overdueAmount.toLocaleString()} overdue
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
