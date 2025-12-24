"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { RequireRole } from "@/components/auth/require-role"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { ROLES } from "@/lib/constants"

export default function WorkerDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      if (!supabase) return

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    if (!supabase) return

    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <RequireRole allowedRoles={[ROLES.WORKER]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Worker Dashboard</h1>
              <p className="text-gray-400">Manage your clients and team</p>
            </div>
            <Button onClick={handleSignOut} variant="destructive" className="flex items-center gap-2">
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>

          {/* Worker Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Your Clients",
                href: "/dashboard/worker/clients",
                description: "Manage clients assigned to you",
              },
              {
                title: "Invite New Client",
                href: "/dashboard/worker/invite",
                description: "Invite and onboard new clients",
              },
              {
                title: "Your Profile",
                href: "/dashboard/profile",
                description: "Manage your account details",
              },
              {
                title: "Support",
                href: "/contact",
                description: "Get in touch with admin team",
              },
            ].map((section, i) => (
              <Card key={i} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{section.description}</p>
                  <Link href={section.href}>
                    <Button className="bg-blue-600 hover:bg-blue-700">Go</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </RequireRole>
  )
}
