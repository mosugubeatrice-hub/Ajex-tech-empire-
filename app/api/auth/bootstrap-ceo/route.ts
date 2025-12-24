import { type NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js"
import { ROLES } from "@/lib/constants"

/**
 * Bootstrap API: Create the first CEO account
 * This endpoint should only be accessible before any users exist
 * POST /api/auth/bootstrap-ceo
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabaseAdmin = createSupabaseAdmin(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    // Check if any profiles exist (first-user check)
    const { data: existingProfiles, error: checkError } = await supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact" })
      .limit(1)

    if (checkError) {
      console.error("[Bootstrap] Error checking existing profiles:", checkError)
      return NextResponse.json({ error: "Failed to verify system state" }, { status: 500 })
    }

    if ((existingProfiles || []).length > 0) {
      return NextResponse.json({ error: "CEO account already exists. Use normal signup instead." }, { status: 403 })
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm CEO account for immediate access
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        is_ceo: true,
      },
    })

    if (authError || !authData.user) {
      console.error("[Bootstrap] Error creating CEO user:", authError)
      return NextResponse.json({ error: authError?.message || "Failed to create CEO account" }, { status: 500 })
    }

    // Create CEO profile with special protections
    const { error: profileError } = await supabaseAdmin.from("profiles").insert([
      {
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        role: ROLES.CEO, // Assign CEO role - this role cannot be changed or removed
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (profileError) {
      console.error("[Bootstrap] Error creating CEO profile:", profileError)
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: "Failed to create CEO profile" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "CEO account created successfully",
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
    })
  } catch (error) {
    console.error("[Bootstrap] Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
