import nodemailer from 'nodemailer'

// Configure your email service here
// For production, use environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

interface EmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions) {
  try {
    // Skip sending if email credentials aren't configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email service not configured. Skipping email send.')
      return { success: true, message: 'Email service not configured' }
    }

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      replyTo: replyTo || process.env.EMAIL_USER,
    })

    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' }
  }
}

// Email templates
export function getLeadConfirmationEmail(name: string, subject: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); padding: 40px 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">We've received your message</p>
      </div>
      <div style="background: #f8f9fa; padding: 40px 20px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${name},</p>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out to us! We've received your inquiry about <strong>${subject}</strong>.
        </p>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
          Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.
        </p>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
          In the meantime, if you have any questions, feel free to reply to this email.
        </p>
        <div style="background: white; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            <strong>AJEx Tech Empire</strong><br/>
            Transforming businesses through technology
          </p>
        </div>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          © 2024 AJEx Tech Empire. All rights reserved.
        </p>
      </div>
    </div>
  `
}

export function getBookingConfirmationEmail(name: string, date: string, time: string, serviceType: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); padding: 40px 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Booking Confirmed!</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Your consultation is scheduled</p>
      </div>
      <div style="background: #f8f9fa; padding: 40px 20px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${name},</p>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
          Your consultation has been successfully scheduled. Here are your booking details:
        </p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; font-size: 14px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Service Type:</td>
              <td style="padding: 10px 0; color: #333; font-weight: bold; text-align: right;">${serviceType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; color: #666;">Date:</td>
              <td style="padding: 10px 0; color: #333; font-weight: bold; text-align: right;">${new Date(date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;">Time:</td>
              <td style="padding: 10px 0; color: #333; font-weight: bold; text-align: right;">${time}</td>
            </tr>
          </table>
        </div>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
          A calendar invite has been sent to your email. You'll receive a video call link 15 minutes before the scheduled time.
        </p>
        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
          If you need to reschedule or have any questions, please don't hesitate to contact us.
        </p>
        <div style="background: white; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            <strong>AJEx Tech Empire</strong><br/>
            Support: support@ajextechempire.com
          </p>
        </div>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          © 2024 AJEx Tech Empire. All rights reserved.
        </p>
      </div>
    </div>
  `
}

export function getAdminNotificationEmail(type: 'lead' | 'booking', details: Record<string, any>) {
  const heading = type === 'lead' ? 'New Lead Received' : 'New Booking Scheduled'
  const detailsHtml = Object.entries(details)
    .map(([key, value]) => `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">${key}:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${value}</td></tr>`)
    .join('')

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%); padding: 40px 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">${heading}</h1>
      </div>
      <div style="background: #f8f9fa; padding: 40px 20px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; font-size: 14px;">
          ${detailsHtml}
        </table>
        <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
          Log in to your admin dashboard to manage this ${type}.
        </p>
      </div>
    </div>
  `
}
