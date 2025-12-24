import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js"
import { ROLES } from "@/lib/constants"

/**
 * Bootstrap the first CEO account
 * This should only be called once during initial setup
 */
export async function bootstrapCEOAccount(email: string, password: string, firstName: string, lastName: string) {
  try {
    const supabaseAdmin = createSupabaseAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    // Check if any profiles exist (to ensure this is first user)
    const { data: existingProfiles, error: checkError } = await supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact" })
      .limit(1)

    if (checkError) {
      console.error("[Bootstrap] Error checking existing profiles:", checkError)
      return { error: "Failed to check existing users" }
    }

    if ((existingProfiles || []).length > 0) {
      return { error: "CEO account already exists" }
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm CEO account
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        is_ceo: true,
      },
    })

    if (authError || !authData.user) {
      console.error("[Bootstrap] Error creating CEO user:", authError)
      return { error: authError?.message || "Failed to create CEO account" }
    }

    // Create CEO profile
    const { error: profileError } = await supabaseAdmin.from("profiles").insert([
      {
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        role: ROLES.CEO,
        email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (profileError) {
      console.error("[Bootstrap] Error creating CEO profile:", profileError)
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return { error: "Failed to create CEO profile" }
    }

    return {
      success: true,
      message: "CEO account created successfully",
      user: authData.user,
    }
  } catch (error) {
    console.error("[Bootstrap] Unexpected error:", error)
    return { error: "An unexpected error occurred" }
  }
}

/**
 * Check if CEO account exists
 */
export async function ceoAccountExists() {
  try {
    const supabaseAdmin = createSupabaseAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    const { data, error } = await supabaseAdmin.from("profiles").select("id").eq("role", ROLES.CEO).limit(1)

    if (error) {
      console.error("[Bootstrap] Error checking CEO:", error)
      return false
    }

    return (data || []).length > 0
  } catch (error) {
    console.error("[Bootstrap] Error:", error)
    return false
  }
}
