import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Building, Mail, Phone, MapPin, Calendar, Edit, FileText } from "lucide-react"

interface CustomerDetailsProps {
  customer: any
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      case "prospect":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Customer Information</span>
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-medium text-slate-900">{customer.name}</p>
              </div>
            </div>

            {customer.company && (
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Company</p>
                  <p className="font-medium text-slate-900">{customer.company}</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {customer.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">{customer.email}</p>
                </div>
              </div>
            )}

            {customer.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">{customer.phone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            {customer.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="font-medium text-slate-900">{customer.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Customer Since</p>
                <p className="font-medium text-slate-900">{new Date(customer.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-slate-500 mb-2">Notes</p>
                <p className="text-slate-700 leading-relaxed">{customer.notes}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
