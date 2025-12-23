import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, service } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database connection unavailable" }, { status: 500 })
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, phone, message, service, created_at: new Date() }])

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save contact" }, { status: 500 })
    }

    console.log("Contact submission saved:", { name, email, phone, message, service })

    return NextResponse.json({ message: "Thank you for your message. We'll be in touch soon!" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}
