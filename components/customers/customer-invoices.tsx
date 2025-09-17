import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

interface CustomerInvoicesProps {
  invoices: any[]
  customerId: string
}

export function CustomerInvoices({ invoices, customerId }: CustomerInvoicesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-slate-100 text-slate-800 border-slate-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const totalRevenue = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Invoices ({invoices.length})</span>
          </CardTitle>
          <Link href={`/invoices/new?customer=${customerId}`}>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </Link>
        </div>
        {totalRevenue > 0 && (
          <div className="text-sm text-slate-600">
            Total Revenue: <span className="font-semibold text-green-600">${totalRevenue.toLocaleString()}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{invoice.invoice_number}</h4>
                    {invoice.notes && <p className="text-sm text-slate-600 mt-1">{invoice.notes}</p>}
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(invoice.issue_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>${invoice.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No invoices yet</p>
            <p className="text-sm">Create an invoice for this customer</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
