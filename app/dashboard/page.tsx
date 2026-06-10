"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LogOut, User, FileText, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  company_name: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
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

        // Fetch user profile from database
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()

        if (!error && profile) {
          setUser(profile)
        } else {
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            first_name: "",
            last_name: "",
            company_name: "",
            role: "client",
          })
        }
      } catch (error) {
        console.error("Error fetching user:", error)
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="text-white text-lg">Loading your dashboard...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <div className="text-white">User not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Client Dashboard</h1>
            <p className="text-gray-400">
              Welcome, {user.first_name || "Client"} • {user.email}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="destructive" className="flex items-center gap-2">
            <LogOut size={18} />
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white font-semibold">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Company</p>
                <p className="text-white font-semibold">{user.company_name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-white font-semibold capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Features */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Edit Profile", href: "/dashboard/profile", icon: User, description: "Update your account details" },
            { title: "View Projects", href: "/dashboard/projects", icon: BarChart3, description: "See your active projects" },
            {
              title: "Invoices",
              href: "/dashboard/invoices",
              icon: FileText,
              description: "Review your invoices",
            },
            { title: "Contact Support", href: "/contact", icon: User, description: "Reach out to our team" },
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
  )
}
