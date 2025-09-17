import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { consultationType, teamMember, date, time, meetingType, name, email, phone, company, projectDescription } =
      body

    // Validate required fields
    if (!consultationType || !teamMember || !date || !time || !name || !email) {
      return NextResponse.json({ error: "Missing required booking information" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Check availability in your calendar system
    // 2. Create calendar events
    // 3. Send confirmation emails
    // 4. Save booking to database
    // 5. Send notifications to team member

    console.log("Booking submission:", {
      consultationType,
      teamMember,
      date,
      time,
      meetingType,
      name,
      email,
      phone,
      company,
      projectDescription,
      timestamp: new Date().toISOString(),
    })

    // Simulate booking confirmation
    const bookingId = `BOOK-${Date.now()}`

    return NextResponse.json({
      success: true,
      bookingId,
      message: "Your consultation has been successfully booked!",
      details: {
        consultationType,
        teamMember,
        date,
        time,
        meetingType,
      },
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to process booking. Please try again." }, { status: 500 })
  }
}
