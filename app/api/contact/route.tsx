import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, service, budget, message, projectType } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    const userAgent = request.headers.get("user-agent") || ""
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send auto-response email

    // For now, we'll simulate a successful submission
    console.log("Contact form submission:", {
      name,
      email,
      company,
      phone,
      service,
      budget,
      message,
      projectType,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    })

    const emailData = {
      to: "hello@ajextechempire.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Service:</strong> ${service || "Not specified"}</p>
            <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
            <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
            <strong>IP:</strong> ${ip}
          </p>
        </div>
      `,
    }

    // Auto-response email to user
    const autoResponse = {
      to: email,
      subject: "Thank you for contacting AJEx Tech Empire",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #3b82f6; margin: 0;">AJEx Tech Empire</h1>
            <p style="color: #6b7280; margin: 5px 0;">Premium Digital Growth Agency</p>
          </div>
          
          <h2 style="color: #3b82f6;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and appreciate you taking the time to contact AJEx Tech Empire. Our team will review your inquiry and get back to you within 24 hours.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #1e40af;">Your submission details:</p>
            <ul style="margin: 10px 0; color: #374151;">
              <li>Service: ${service || "Not specified"}</li>
              <li>Budget: ${budget || "Not specified"}</li>
              <li>Project Type: ${projectType || "Not specified"}</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to explore our <a href="/portfolio" style="color: #3b82f6;">portfolio</a> or learn more about our <a href="/services" style="color: #3b82f6;">services</a>.</p>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="margin: 0;">Best regards,<br><strong>The AJEx Tech Empire Team</strong></p>
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
              📧 hello@ajextechempire.com | 📞 +1 (555) 123-4567
            </p>
          </div>
        </div>
      `,
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
