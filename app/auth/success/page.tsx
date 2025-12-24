"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // This page should not be directly accessed
    // Redirect to home after a brief moment
    const timer = setTimeout(() => {
      router.push("/")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Completing sign in...</h1>
        <p className="text-slate-600">Redirecting you to your dashboard</p>
      </div>
    </div>
  )
}
