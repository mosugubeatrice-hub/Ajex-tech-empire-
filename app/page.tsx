import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Business Management Platform</h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your business operations with our comprehensive management solution
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-3">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Customer Management</h3>
            <p className="text-gray-600">Track and manage your customer relationships</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Project Tracking</h3>
            <p className="text-gray-600">Monitor project progress and deadlines</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Inventory Control</h3>
            <p className="text-gray-600">Manage stock levels and product information</p>
          </div>
        </div>
      </div>
    </div>
  )
}
