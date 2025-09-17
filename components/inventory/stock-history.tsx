"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Plus, Minus, Package } from "lucide-react"
import { useState } from "react"

interface StockHistoryProps {
  product: any
}

export function StockHistory({ product }: StockHistoryProps) {
  const [adjustmentType, setAdjustmentType] = useState("add")
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")

  // Mock stock history data - in a real app, this would come from a stock_movements table
  const stockHistory = [
    {
      id: 1,
      type: "initial",
      quantity: product.quantity,
      reason: "Initial stock",
      date: product.created_at,
      user: "System",
    },
    // Add more mock entries as needed
  ]

  const handleStockAdjustment = async () => {
    // In a real app, this would update the product quantity and create a stock movement record
    console.log("Stock adjustment:", {
      type: adjustmentType,
      quantity: adjustmentQuantity,
      reason: adjustmentReason,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Stock Adjustment */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Adjust Stock</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Adjustment Type</Label>
              <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock</SelectItem>
                  <SelectItem value="remove">Remove Stock</SelectItem>
                  <SelectItem value="set">Set Stock Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                value={adjustmentQuantity}
                onChange={(e) => setAdjustmentQuantity(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason</Label>
            <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restock">Restock</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="correction">Inventory Correction</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span>Current Stock:</span>
              <span className="font-medium">{product.quantity} units</span>
            </div>
            {adjustmentQuantity && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span>New Stock:</span>
                <span className="font-medium">
                  {adjustmentType === "add"
                    ? product.quantity + Number.parseInt(adjustmentQuantity)
                    : adjustmentType === "remove"
                      ? Math.max(0, product.quantity - Number.parseInt(adjustmentQuantity))
                      : Number.parseInt(adjustmentQuantity)}{" "}
                  units
                </span>
              </div>
            )}
          </div>

          <Button
            onClick={handleStockAdjustment}
            className="w-full"
            disabled={!adjustmentQuantity || !adjustmentReason}
          >
            {adjustmentType === "add" ? (
              <Plus className="h-4 w-4 mr-2" />
            ) : adjustmentType === "remove" ? (
              <Minus className="h-4 w-4 mr-2" />
            ) : (
              <BarChart3 className="h-4 w-4 mr-2" />
            )}
            Apply Adjustment
          </Button>
        </CardContent>
      </Card>

      {/* Stock History */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Stock History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stockHistory.length > 0 ? (
            <div className="space-y-4">
              {stockHistory.map((entry) => (
                <div key={entry.id} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900 capitalize">{entry.type}</h4>
                      <p className="text-sm text-slate-600">{entry.reason}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(entry.date).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">{entry.quantity} units</div>
                      <div className="text-xs text-slate-500">by {entry.user}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No stock movements yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
