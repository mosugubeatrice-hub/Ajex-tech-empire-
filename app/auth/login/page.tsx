"use client"

import type React from "react"
import { Suspense } from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Building2, CheckCircle } from "lucide-react"

function LoginContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams.get("message")
    if (message) {
      setSuccessMessage(message)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (!supabase) {
      setError("Unable to connect to authentication service")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Login attempt with email:", email)
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Sign in response:", { error: signInError, hasUser: !!data.user })

      if (signInError) {
        console.error("[v0] Sign in failed:", signInError)
        throw signInError
      }

      if (!data.user) {
        throw new Error("No user returned from sign in")
      }

      console.log("[v0] User authenticated:", data.user.id)

      await new Promise((resolve) => setTimeout(resolve, 500))

      let attempts = 0
      let userRole = null

      while (attempts < 15 && !userRole) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        console.log(`[v0] Profile fetch attempt ${attempts + 1}:`, { userRole: profile?.role, error: profileError })

        if (profile?.role) {
          userRole = profile.role
          break
        }

        await new Promise((resolve) => setTimeout(resolve, 300))
        attempts++
      }

      if (!userRole) {
        console.error("[v0] Could not fetch user role after 15 attempts")
        throw new Error("Unable to load user profile. Please try again.")
      }

      console.log("[v0] User role:", userRole)
      const redirectPath =
        userRole === "ceo" || userRole === "admin"
          ? "/admin"
          : userRole === "worker"
            ? "/dashboard/worker"
            : "/dashboard"

      console.log("[v0] Redirecting to:", redirectPath)
      router.push(redirectPath)
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-600 mt-2">Sign in to your business dashboard</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-600">{successMessage}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  )
}
