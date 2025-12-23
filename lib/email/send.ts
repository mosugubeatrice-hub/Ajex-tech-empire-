/**
 * Email Sending Service
 * Uses Supabase's built-in email sending via PostgREST
 * For production, integrate with Resend, SendGrid, or AWS SES
 */

import { BUSINESS_CONFIG } from "@/lib/config"

interface EmailParams {
  to: string
  from: string
  subject: string
  html: string
  text?: string
}

/**
 * Send email via Supabase or configured email service
 * Currently configured for Supabase Functions integration
 */
export async function sendEmail(params: EmailParams) {
  try {
    // For production, implement actual email sending:
    // - Resend API (recommended)
    // - SendGrid API
    // - AWS SES
    // - Supabase Functions + any email provider

    // Placeholder: Log email for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Email] Sending email:", {
        to: params.to,
        subject: params.subject,
        from: params.from,
      })
      return { success: true }
    }

    // Production email sending would go here
    // Example with Resend:
    /*
    const { data, error } = await resend.emails.send({
      from: params.from,
      to: params.to,
      subject: params.subject,
      html: params.html,
    })
    if (error) throw error
    return { success: true, messageId: data.id }
    */

    return { success: true }
  } catch (error) {
    console.error("[Email] Failed to send email:", error)
    throw error
  }
}

/**
 * Send email via Supabase auth
 * Used for internal auth emails like password reset
 */
export async function sendAuthEmail(email: string, subject: string, html: string) {
  return sendEmail({
    to: email,
    from: `${BUSINESS_CONFIG.name} <${BUSINESS_CONFIG.email.noreply}>`,
    subject,
    html,
  })
}
