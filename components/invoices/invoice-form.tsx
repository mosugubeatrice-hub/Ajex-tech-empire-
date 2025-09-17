"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, User, Calendar, DollarSign, Plus, Trash2, Building } from "lucide-react"

interface InvoiceFormProps {
  customers: any[]
  projects: any[]
  products: any[]
  profile: any
}

interface InvoiceItem {
  id: string
  product_id?: string
  description: string
  quantity: number
  unit_price: number
  total: number
}

export function InvoiceForm({ customers, projects, products, profile }: InvoiceFormProps) {
  const searchParams = useSearchParams()
  const preselectedCustomer = searchParams.get("customer")
  const preselectedProject = searchParams.get("project")

  const [formData, setFormData] = useState({
    customer_id: preselectedCustomer || "",
    project_id: preselectedProject || "",
    invoice_number: `INV-${Date.now().toString().slice(-6)}`,
    issue_date: new Date().toISOString().split("T")[0],
    due_date: "",
    notes: "",
    tax_rate: "0",
  })

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      unit_price: 0,
      total: 0,
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Filter projects based on selected customer
  const filteredProjects = projects.filter(
    (project) => !formData.customer_id || project.customer_id === formData.customer_id,
  )

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const taxAmount = subtotal * (Number.parseFloat(formData.tax_rate) / 100)
  const total = subtotal + taxAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // Create invoice
      const invoiceData = {
        ...formData,
        user_id: user.id,
        customer_id: formData.customer_id || null,
        project_id: formData.project_id || null,
        subtotal,
        tax_amount: taxAmount,
        total,
        status: "draft",
        due_date: formData.due_date || null,
      }

      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single()

      if (invoiceError) throw invoiceError

      // Create invoice items
      const itemsData = items
        .filter((item) => item.description.trim())
        .map((item) => ({
          invoice_id: invoice.id,
          product_id: item.product_id || null,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total: item.total,
        }))

      if (itemsData.length > 0) {
        const { error: itemsError } = await supabase.from("invoice_items").insert(itemsData)
        if (itemsError) throw itemsError
      }

      router.push("/invoices")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unit_price: 0,
        total: 0,
      },
    ])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          // Recalculate total when quantity or unit_price changes
          if (field === "quantity" || field === "unit_price") {
            updated.total = updated.quantity * updated.unit_price
          }
          // Auto-fill from product selection
          if (field === "product_id" && value) {
            const product = products.find((p) => p.id === value)
            if (product) {
              updated.description = product.name
              updated.unit_price = product.price || 0
              updated.total = updated.quantity * updated.unit_price
            }
          }
          return updated
        }
        return item
      }),
    )
  }

  return (
    <div className="space-y-8">
      {/* Invoice Header */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="invoice_number" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Invoice Number</span>
                </Label>
                <Input
                  id="invoice_number"
                  value={formData.invoice_number}
                  onChange={(e) => handleChange("invoice_number", e.target.value)}
                  placeholder="INV-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue_date" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Issue Date</span>
                </Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => handleChange("issue_date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due_date" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Due Date</span>
                </Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => handleChange("due_date", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Client</span>
                </Label>
                <Select value={formData.customer_id} onValueChange={(value) => handleChange("customer_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No client</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} {customer.company && `(${customer.company})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project" className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Project</span>
                </Label>
                <Select value={formData.project_id} onValueChange={(value) => handleChange("project_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No project</SelectItem>
                    {filteredProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Additional notes or payment terms..."
                rows={3}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Invoice Items</CardTitle>
            <Button type="button" onClick={addItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="w-24">Qty</TableHead>
                  <TableHead className="w-32">Unit Price</TableHead>
                  <TableHead className="w-32">Total</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Item description"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.product_id || ""}
                        onValueChange={(value) => updateItem(item.id, "product_id", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Custom item</SelectItem>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - ${product.price?.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unit_price}
                        onChange={(e) => updateItem(item.id, "unit_price", Number.parseFloat(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${item.total.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tax_rate" className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Tax Rate (%)</span>
                </Label>
                <Input
                  id="tax_rate"
                  type="number"
                  step="0.01"
                  value={formData.tax_rate}
                  onChange={(e) => handleChange("tax_rate", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax ({formData.tax_rate}%):</span>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.push("/invoices")}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading || items.every((item) => !item.description.trim())}>
                {isLoading ? "Creating..." : "Create Invoice"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
