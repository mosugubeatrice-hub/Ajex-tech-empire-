import { type NextRequest, NextResponse } from "next/server"
import { getRedirectPathByRole, getUserRole } from "@/lib/auth/rbac"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    console.log("[v0] Auth success handler: Getting user role for", userId)

    // Get user role from database
    const userRole = await getUserRole(userId)
    console.log("[v0] User role:", userRole)

    // Get redirect path based on role
    const redirectPath = getRedirectPathByRole(userRole)
    console.log("[v0] Redirecting to:", redirectPath)

    return NextResponse.json({ redirectUrl: redirectPath }, { status: 200 })
  } catch (error) {
    console.error("[v0] Auth success error:", error)
    return NextResponse.json({ error: "Failed to process login" }, { status: 500 })
  }
}
