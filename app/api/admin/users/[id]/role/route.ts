import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { ROLES } from "@/lib/constants"

/**
 * PUT /api/admin/users/[id]/role
 * Update user role (admin only, cannot change CEO role)
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: userId } = await params
    const { role } = await request.json()

    // Validate role
    if (!Object.values(ROLES).includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

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

    // Check if requester is admin/CEO
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: adminProfile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (adminProfile?.role !== ROLES.ADMIN && adminProfile?.role !== ROLES.CEO) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Check if target user exists and is not CEO (CEO cannot be changed)
    const { data: targetProfile } = await supabase.from("profiles").select("role").eq("id", userId).single()

    if (!targetProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (targetProfile.role === ROLES.CEO) {
      return NextResponse.json({ error: "Cannot modify CEO role" }, { status: 403 })
    }

    // Update the role
    const { error } = await supabase.from("profiles").update({ role }).eq("id", userId)

    if (error) throw error

    return NextResponse.json({ success: true, role })
  } catch (error) {
    console.error("[API] Failed to update user role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
