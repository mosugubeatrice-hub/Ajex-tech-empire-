"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Hash, DollarSign, FileText, Tag, BarChart3 } from "lucide-react"

export function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    cost: "",
    quantity: "",
    category: "",
    status: "active",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const productData = {
        ...formData,
        user_id: user.id,
        price: formData.price ? Number.parseFloat(formData.price) : null,
        cost: formData.cost ? Number.parseFloat(formData.cost) : null,
        quantity: formData.quantity ? Number.parseInt(formData.quantity) : 0,
      }

      const { error } = await supabase.from("products").insert(productData)

      if (error) throw error

      router.push("/inventory")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Product Name *</span>
              </Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Premium Widget"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku" className="flex items-center space-x-2">
                <Hash className="h-4 w-4" />
                <span>SKU</span>
              </Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
                placeholder="PWG-001"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Description</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Detailed product description..."
              rows={3}
            />
          </div>

          {/* Pricing and Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Selling Price</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="99.99"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Cost Price</span>
              </Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => handleChange("cost", e.target.value)}
                placeholder="49.99"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Initial Stock</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="100"
              />
            </div>
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span>Category</span>
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Electronics, Clothing, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Profit Margin Display */}
          {formData.price && formData.cost && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Profit Margin</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    ${(Number.parseFloat(formData.price) - Number.parseFloat(formData.cost)).toFixed(2)}
                  </div>
                  <div className="text-sm text-slate-500">
                    {(
                      ((Number.parseFloat(formData.price) - Number.parseFloat(formData.cost)) /
                        Number.parseFloat(formData.price)) *
                      100
                    ).toFixed(1)}
                    % margin
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/inventory")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
