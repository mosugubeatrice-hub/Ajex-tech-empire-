import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProductDetails } from "@/components/inventory/product-details"
import { StockHistory } from "@/components/inventory/stock-history"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch product data
  const [{ data: profile }, { data: product }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("products").select("*").eq("id", id).eq("user_id", user.id).single(),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link href="/inventory">
              <ArrowLeft className="h-6 w-6 text-slate-600 hover:text-slate-900" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
              <p className="text-slate-600 mt-2">Product details and inventory tracking</p>
            </div>
          </div>

          {/* Product Details */}
          <ProductDetails product={product} />

          {/* Stock History */}
          <StockHistory product={product} />
        </div>
      </main>
    </div>
  )
}
