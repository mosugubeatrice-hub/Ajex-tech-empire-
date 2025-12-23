import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

/**
 * GET /api/admin/users
 * Fetch all users (admin only)
 */
export async function GET(request: NextRequest) {
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
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { data: users, error } = await supabase
      .from("profiles")
      .select("id, created_at, role, first_name, last_name")
      .order("created_at", { ascending: false })

    if (error) throw error

    // Get auth user emails
    const { data: authUsers } = await supabase.auth.admin.listUsers()

    const enrichedUsers = users.map((u) => {
      const authUser = authUsers?.users.find((au) => au.id === u.id)
      return {
        ...u,
        email: authUser?.email || "",
        last_sign_in_at: authUser?.last_sign_in_at,
      }
    })

    return NextResponse.json(enrichedUsers)
  } catch (error) {
    console.error("[API] Failed to fetch users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
