import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

let serverClient: SupabaseClient | null = null

export function createClient() {
  if (!serverClient) {
    serverClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return serverClient
}
