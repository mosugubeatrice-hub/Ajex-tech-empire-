"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { RoleType } from "@/lib/constants"

interface RequireRoleProps {
  allowedRoles: RoleType[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Client-side role protection wrapper
 * Updated to accept array of allowed roles instead of single role
 */
export function RequireRole({ allowedRoles, children, fallback }: RequireRoleProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function checkRole() {
      const supabase = createClient()
      if (!supabase) {
        setIsAuthorized(false)
        return
      }

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setIsAuthorized(false)
        return
      }

      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

      if (allowedRoles.includes(profile?.role)) {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
        router.push("/dashboard")
      }
    }

    checkRole()
  }, [allowedRoles, router])

  if (isAuthorized === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthorized) {
    return fallback || <div className="flex items-center justify-center min-h-screen">Access Denied</div>
  }

  return <>{children}</>
}
