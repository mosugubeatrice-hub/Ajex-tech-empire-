import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

let supabaseInstance: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance
  }

  if (typeof window === "undefined") {
    throw new Error("Supabase client can only be created in the browser")
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  if (!window.localStorage) {
    throw new Error("LocalStorage is not available")
  }

  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
    },
  })

  console.log("[v0] Supabase client initialized (singleton)")
  return supabaseInstance
}

export function getSupabaseClient(): SupabaseClient {
  return createClient()
}

export function getSupabaseInstance(): SupabaseClient | null {
  return supabaseInstance
}
