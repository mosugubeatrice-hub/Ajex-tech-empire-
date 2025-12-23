import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Server-side authentication utilities
 */

export async function getServerUser() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          },
        },
      },
    )

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    return {
      user,
      profile,
    }
  } catch (error) {
    console.error("[Auth] Failed to get server user:", error)
    return null
  }
}

/**
 * Require authentication on server
 */
export async function requireAuth() {
  const data = await getServerUser()
  if (!data) {
    throw new Error("Unauthorized")
  }
  return data
}

/**
 * Require admin role on server
 */
export async function requireAdmin() {
  const data = await requireAuth()
  if (data.profile?.role !== "admin") {
    throw new Error("Forbidden: Admin access required")
  }
  return data
}
