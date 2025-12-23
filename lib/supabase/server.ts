import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

// Server-side singleton for service role operations (admin)
let serverAdminClient: SupabaseClient | null = null

export function createClient(): SupabaseClient | null {
  if (!serverAdminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
      console.error("[v0] Supabase server environment variables are missing")
      return null
    }

    serverAdminClient = createSupabaseClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return serverAdminClient
}

export function getServerClient(): SupabaseClient | null {
  return createClient()
}
