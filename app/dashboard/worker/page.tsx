"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { RequireRole } from "@/components/auth/require-role"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, Users, Plus, User, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { ROLES } from "@/lib/constants"

interface WorkerProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  company_name: string
  role: string
}

export default function WorkerDashboardPage() {
  const [user, setUser] = useState<WorkerProfile | null>(null)
  const [clientCount, setClientCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        if (!supabase) return

        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push("/auth/login")
          return
        }

        // Fetch worker profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (!profileError && profile) {
          setUser(profile)

          // Count customers assigned to this worker
          const { count } = await supabase
            .from("customers")
            .select("id", { count: "exact" })
            .eq("user_id", authUser.id)

          setClientCount(count || 0)
        } else {
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            first_name: "",
            last_name: "",
            company_name: "",
            role: "worker",
          })
        }
      } catch (error) {
        console.error("Error fetching worker data:", error)
      } finally {
        setLoading(false)
      }
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
    return (
      <RequireRole allowedRoles={[ROLES.WORKER]}>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
          <div className="text-white">Loading your workspace...</div>
        </div>
      </RequireRole>
    )
  }

  if (!user) {
    return (
      <RequireRole allowedRoles={[ROLES.WORKER]}>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
          <div className="text-white">Worker data not found</div>
        </div>
      </RequireRole>
    )
  }

  return (
    <RequireRole allowedRoles={[ROLES.WORKER]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Worker Dashboard</h1>
              <p className="text-gray-400">
                {user.first_name || "Worker"} • Managing {clientCount} client{clientCount !== 1 ? "s" : ""}
              </p>
            </div>
            <Button onClick={handleSignOut} variant="destructive" className="flex items-center gap-2">
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>

          {/* Stats */}
          <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{clientCount}</div>
              <p className="text-gray-400 mt-2">client{clientCount !== 1 ? "s" : ""} assigned to you</p>
            </CardContent>
          </Card>

          {/* Worker Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "View Clients",
                href: "/dashboard/worker/clients",
                icon: Users,
                description: "See and manage your assigned clients",
              },
              {
                title: "Invite Client",
                href: "/dashboard/worker/invite",
                icon: Plus,
                description: "Send invitation to new clients",
              },
              {
                title: "Edit Profile",
                href: "/dashboard/profile",
                icon: User,
                description: "Update your account information",
              },
              {
                title: "Help",
                href: "/contact",
                icon: HelpCircle,
                description: "Contact the admin team",
              },
            ].map((section, i) => {
              const Icon = section.icon
              return (
                <Card key={i} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{section.description}</p>
                    <Link href={section.href}>
                      <Button className="bg-blue-600 hover:bg-blue-700">Go</Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </RequireRole>
  )
}
