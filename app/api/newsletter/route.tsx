import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source = "website" } = body

    // Validate email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 })
    }

    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Here you would typically:
    // 1. Check for existing subscription
    // 2. Add to newsletter database
    // 3. Add to email marketing platform (Mailchimp, ConvertKit, etc.)
    // 4. Send welcome email

    console.log("Newsletter subscription:", {
      email,
      source,
      ip,
      timestamp: new Date().toISOString(),
    })

    const welcomeEmail = {
      to: email,
      subject: "🚀 Welcome to AJEx Tech Empire Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🚀 Welcome Aboard!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">You're now part of the AJEx Tech Empire community</p>
          </div>
          
          <h2 style="color: #3b82f6;">Thank you for subscribing!</h2>
          <p>Welcome to AJEx Tech Empire's exclusive newsletter. You've just joined a community of forward-thinking business leaders and digital innovators.</p>
          
          <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border: 1px solid #bfdbfe; margin: 25px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">What you'll receive:</h3>
            <ul style="color: #374151; line-height: 1.6;">
              <li>🎯 <strong>Industry Insights:</strong> Latest trends and market analysis</li>
              <li>💡 <strong>Expert Strategies:</strong> Proven growth tactics and techniques</li>
              <li>🔥 <strong>Exclusive Content:</strong> Premium resources and case studies</li>
              <li>📈 <strong>Success Stories:</strong> Real results from our client projects</li>
              <li>🎁 <strong>Special Offers:</strong> Early access to new services and discounts</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="/blog" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              📚 Explore Our Blog
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>💡 Pro Tip:</strong> Add hello@ajextechempire.com to your contacts to ensure our emails reach your inbox!
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="margin: 0; color: #374151;">Ready to transform your digital presence?</p>
            <p style="margin: 10px 0;">
              <a href="/contact" style="color: #3b82f6; text-decoration: none; font-weight: bold;">Get in touch →</a>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
              Best regards,<br><strong>The AJEx Tech Empire Team</strong>
            </p>
          </div>
        </div>
      `,
    }

    return NextResponse.json({
      success: true,
      message: "🎉 Successfully subscribed! Check your email for a welcome message.",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
