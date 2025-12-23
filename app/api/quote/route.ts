import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, services, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !services || !services.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database connection unavailable" }, { status: 500 })
    }

    const { data, error } = await supabase.from("quotes").insert([
      {
        name,
        email,
        company,
        services: services.join(", "),
        budget,
        timeline,
        message,
        created_at: new Date(),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save quote request" }, { status: 500 })
    }

    console.log("Quote request saved:", { name, email, company, services, budget, timeline })

    return NextResponse.json(
      { message: "Thank you for your quote request. Our team will review and get back to you within 24 hours!" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Quote request error:", error)
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 })
  }
}
