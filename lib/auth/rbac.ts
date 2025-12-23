import { USER_ROLES, ROLE_PERMISSIONS } from "@/lib/config"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

/**
 * Get user role from database
 */
export async function getUserRole(userId: string): Promise<UserRole | null> {
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

    const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single()

    if (error) {
      console.error("[RBAC] Error fetching user role:", error)
      return null
    }

    return data?.role as UserRole
  } catch (error) {
    console.error("[RBAC] Failed to get user role:", error)
    return null
  }
}

/**
 * Check if user has permission
 */
export function hasPermission(role: UserRole, permission: keyof (typeof ROLE_PERMISSIONS)["admin"]): boolean {
  const rolePermissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS]
  return rolePermissions?.[permission] ?? false
}

/**
 * Check if user is admin
 */
export function isAdmin(role: UserRole | null): boolean {
  return role === USER_ROLES.ADMIN
}

/**
 * Check if user is client
 */
export function isClient(role: UserRole | null): boolean {
  return role === USER_ROLES.CLIENT
}
