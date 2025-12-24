import { ROLES, ROLE_PERMISSIONS, type RoleType } from "@/lib/constants"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Get user role from database
 */
export async function getUserRole(userId: string): Promise<RoleType | null> {
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

    return data?.role as RoleType
  } catch (error) {
    console.error("[RBAC] Failed to get user role:", error)
    return null
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(role: RoleType | null, permission: keyof (typeof ROLE_PERMISSIONS)["ceo"]): boolean {
  if (!role) return false
  const permissions = ROLE_PERMISSIONS[role]
  return permissions?.[permission] ?? false
}

/**
 * Check if user is CEO (cannot be locked out)
 */
export function isCEO(role: RoleType | null): boolean {
  return role === ROLES.CEO
}

/**
 * Check if user is admin
 */
export function isAdmin(role: RoleType | null): boolean {
  return role === ROLES.ADMIN
}

/**
 * Check if user is worker
 */
export function isWorker(role: RoleType | null): boolean {
  return role === ROLES.WORKER
}

/**
 * Check if user is client
 */
export function isClient(role: RoleType | null): boolean {
  return role === ROLES.CLIENT
}

/**
 * Check if user can access admin panel
 */
export function canAccessAdmin(role: RoleType | null): boolean {
  return hasPermission(role, "canAccessAdmin")
}

/**
 * Get redirect path based on role
 */
export function getRedirectPathByRole(role: RoleType | null): string {
  switch (role) {
    case ROLES.CEO:
    case ROLES.ADMIN:
      return "/admin"
    case ROLES.WORKER:
      return "/dashboard/worker"
    case ROLES.CLIENT:
      return "/dashboard"
    default:
      return "/dashboard"
  }
}

export type UserRole = RoleType
