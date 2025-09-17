import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Send, Edit, DollarSign } from "lucide-react"

interface InvoiceViewProps {
  invoice: any
  invoiceItems: any[]
  profile: any
}

export function InvoiceView({ invoice, invoiceItems, profile }: InvoiceViewProps) {
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

  const isOverdue = () => {
    if (invoice.status === "paid" || !invoice.due_date) return false
    return new Date(invoice.due_date) < new Date()
  }

  const currentStatus = isOverdue() ? "overdue" : invoice.status

  return (
    <div className="space-y-8">
      {/* Invoice Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(currentStatus)}>{currentStatus}</Badge>
              <div className="text-sm text-slate-600">
                Created on {new Date(invoice.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              {invoice.status === "draft" && (
                <Button variant="outline" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Send Invoice
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              {invoice.status !== "paid" && (
                <Button size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* From */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">From:</h3>
              <div className="space-y-1">
                <div className="font-medium">{profile?.company_name || "Your Company"}</div>
                <div className="text-slate-600">
                  {profile?.first_name} {profile?.last_name}
                </div>
                {/* Add more company details as needed */}
              </div>
            </div>

            {/* To */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">To:</h3>
              {invoice.customers ? (
                <div className="space-y-1">
                  <div className="font-medium">{invoice.customers.name}</div>
                  {invoice.customers.company && <div className="text-slate-600">{invoice.customers.company}</div>}
                  {invoice.customers.email && <div className="text-slate-600">{invoice.customers.email}</div>}
                  {invoice.customers.address && <div className="text-slate-600">{invoice.customers.address}</div>}
                </div>
              ) : (
                <div className="text-slate-500">No client specified</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t">
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Invoice Number</h4>
              <div className="text-slate-600">{invoice.invoice_number}</div>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Issue Date</h4>
              <div className="text-slate-600">{new Date(invoice.issue_date).toLocaleDateString()}</div>
            </div>
            {invoice.due_date && (
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Due Date</h4>
                <div className={`text-slate-600 ${isOverdue() ? "text-red-600 font-medium" : ""}`}>
                  {new Date(invoice.due_date).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>

          {invoice.projects && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-slate-900 mb-2">Project</h4>
              <div className="text-slate-600">{invoice.projects.name}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.description}</div>
                    </TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unit_price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Invoice Totals */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-right">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
            </div>
            {invoice.tax_amount > 0 && (
              <div className="flex justify-between text-right">
                <span className="text-slate-600">Tax:</span>
                <span className="font-medium">${invoice.tax_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-right text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-slate-900 mb-2">Notes</h4>
              <p className="text-slate-600 leading-relaxed">{invoice.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
