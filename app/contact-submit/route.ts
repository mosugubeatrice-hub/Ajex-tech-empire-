import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail, getLeadConfirmationEmail, getAdminNotificationEmail } from "@/lib/email/service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, company, phone, message, serviceInterest } = body

    // Validate required fields
    if (!email || !name || !message) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, message" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert lead into database
    const { data, error } = await supabase.from("leads").insert([
      {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        message: message.trim(),
        service_interest: serviceInterest || null,
        status: "new",
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Failed to submit contact form" },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting AJEx Tech Empire',
      html: getLeadConfirmationEmail(name, serviceInterest || 'your inquiry'),
    })

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || '',
      subject: `New Lead: ${name}`,
      html: getAdminNotificationEmail('lead', {
        'Name': name,
        'Email': email,
        'Company': company || 'Not provided',
        'Phone': phone || 'Not provided',
        'Service Interest': serviceInterest || 'Not specified',
        'Message': message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        'Submitted': new Date().toLocaleString(),
      }),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully. We'll get back to you soon!",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "An error occurred while submitting the form" },
      { status: 500 }
    )
  }
}
