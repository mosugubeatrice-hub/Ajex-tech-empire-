import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Hash, DollarSign, BarChart3, Tag, Calendar, Edit, AlertTriangle } from "lucide-react"

interface ProductDetailsProps {
  product: any
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "discontinued":
        return "bg-slate-100 text-slate-800 border-slate-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { label: "Out of Stock", color: "bg-red-100 text-red-800 border-red-200", alert: true }
    } else if (quantity < 10) {
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800 border-yellow-200", alert: true }
    } else {
      return { label: "In Stock", color: "bg-green-100 text-green-800 border-green-200", alert: false }
    }
  }

  const stockStatus = getStockStatus(product.quantity)
  const profitMargin = product.price && product.cost ? product.price - product.cost : 0
  const profitPercentage = product.price && product.cost ? ((profitMargin / product.price) * 100).toFixed(1) : 0

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Product Information</span>
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
            <Badge className={stockStatus.color}>
              {stockStatus.alert && <AlertTriangle className="h-3 w-3 mr-1" />}
              {stockStatus.label}
            </Badge>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Product Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Product Name</p>
                  <p className="font-medium text-slate-900">{product.name}</p>
                </div>
              </div>

              {product.sku && (
                <div className="flex items-center space-x-3">
                  <Hash className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">SKU</p>
                    <p className="font-mono text-slate-900">{product.sku}</p>
                  </div>
                </div>
              )}

              {product.category && (
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="font-medium text-slate-900">{product.category}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              {product.price && (
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Selling Price</p>
                    <p className="font-medium text-slate-900">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              )}

              {product.cost && (
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Cost Price</p>
                    <p className="font-medium text-slate-900">${product.cost.toFixed(2)}</p>
                  </div>
                </div>
              )}

              {profitMargin > 0 && (
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Profit Margin</p>
                    <p className="font-medium text-green-600">
                      ${profitMargin.toFixed(2)} ({profitPercentage}%)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Inventory */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Current Stock</p>
                  <p className="font-medium text-slate-900">{product.quantity} units</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Added</p>
                  <p className="font-medium text-slate-900">{new Date(product.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Last Updated</p>
                  <p className="font-medium text-slate-900">{new Date(product.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Value */}
          {product.cost && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Inventory Value (Cost)</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">
                      ${(product.cost * product.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-500">
                      {product.quantity} units × ${product.cost.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {product.price && (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Retail Value</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-900">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {product.quantity} units × ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-slate-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-2">Description</p>
                  <p className="text-slate-700 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
