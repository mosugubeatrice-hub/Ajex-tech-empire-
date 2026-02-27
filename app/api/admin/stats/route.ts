import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

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
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {}
          },
        },
      },
    )

    // Fetch real data from database
    const [totalUsersResult, workersResult, clientsResult, projectsResult] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("profiles").select("id", { count: "exact" }).eq("role", "worker"),
      supabase.from("profiles").select("id", { count: "exact" }).eq("role", "client"),
      supabase.from("projects").select("id", { count: "exact" }),
    ])

    const stats = {
      totalUsers: totalUsersResult.count || 0,
      totalWorkers: workersResult.count || 0,
      totalClients: clientsResult.count || 0,
      totalProjects: projectsResult.count || 0,
    }

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json(
      {
        totalUsers: 0,
        totalWorkers: 0,
        totalClients: 0,
        totalProjects: 0,
      },
      { status: 200 },
    )
  }
}
