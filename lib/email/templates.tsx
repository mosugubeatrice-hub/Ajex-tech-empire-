import { BUSINESS_CONFIG } from "@/lib/config"

/**
 * Email Template System for AJEx Tech Empire
 * All emails are branded and configurable
 */

export const EMAIL_TEMPLATES = {
  /**
   * Signup Confirmation Email
   * Sent to users after they sign up
   */
  signupConfirmation: (params: { confirmUrl: string; userEmail: string; userName: string }) => ({
    to: params.userEmail,
    from: `${BUSINESS_CONFIG.name} <${BUSINESS_CONFIG.email.noreply}>`,
    subject: `Confirm your ${BUSINESS_CONFIG.name} account`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Confirm Your Account</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { text-align: center; margin-bottom: 40px; }
      .logo { font-size: 24px; font-weight: bold; color: #3b82f6; }
      .content { background: #f9fafb; padding: 30px; border-radius: 8px; }
      .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; margin: 20px 0; }
      .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #6b7280; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">${BUSINESS_CONFIG.name}</div>
      </div>
      
      <div class="content">
        <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #111827;">Welcome to ${BUSINESS_CONFIG.name}!</h1>
        <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
          Hi ${params.userName},
        </p>
        <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0;">
          Thanks for signing up! Please confirm your email address by clicking the button below:
        </p>
        
        <div style="text-align: center;">
          <a href="${params.confirmUrl}" class="button">Confirm Email Address</a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin: 20px 0 0 0;">
          Or copy and paste this link: <br/>
          <a href="${params.confirmUrl}" style="color: #3b82f6; word-break: break-all;">${params.confirmUrl}</a>
        </p>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} ${BUSINESS_CONFIG.name}. All rights reserved.</p>
        <p><a href="${BUSINESS_CONFIG.urls.website}" style="color: #3b82f6; text-decoration: none;">${BUSINESS_CONFIG.urls.website}</a></p>
      </div>
    </div>
  </body>
</html>
    `,
    text: `Welcome to ${BUSINESS_CONFIG.name}!\n\nConfirm your email: ${params.confirmUrl}`,
  }),

  /**
   * Admin Notification - New Signup
   * Sent to admins when a new user signs up
   */
  adminNewSignup: (params: { userName: string; userEmail: string; company: string }) => ({
    to: BUSINESS_CONFIG.email.notifications,
    from: `${BUSINESS_CONFIG.name} <${BUSINESS_CONFIG.email.noreply}>`,
    subject: `New signup: ${params.userName}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New User Signup</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333;">
    <h2>New User Signup</h2>
    <p><strong>Name:</strong> ${params.userName}</p>
    <p><strong>Email:</strong> ${params.userEmail}</p>
    <p><strong>Company:</strong> ${params.company}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    <hr/>
    <p style="font-size: 12px; color: #999;">
      This is an automated notification from ${BUSINESS_CONFIG.name}.
    </p>
  </body>
</html>
    `,
  }),

  /**
   * Welcome Email
   * Sent after email is confirmed
   */
  welcomeEmail: (params: { userEmail: string; userName: string; dashboardUrl: string }) => ({
    to: params.userEmail,
    from: `${BUSINESS_CONFIG.name} <${BUSINESS_CONFIG.email.primary}>`,
    subject: `Welcome to ${BUSINESS_CONFIG.name}, ${params.userName}!`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Welcome to ${BUSINESS_CONFIG.name}</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #3b82f6;">Welcome, ${params.userName}!</h1>
      <p>Your account is now active and ready to use.</p>
      <p>
        <a href="${params.dashboardUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; margin: 20px 0;">
          Go to Dashboard
        </a>
      </p>
      <hr/>
      <p style="font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} ${BUSINESS_CONFIG.name}
      </p>
    </div>
  </body>
</html>
    `,
  }),

  /**
   * Contact Form Submission Notification
   * Sent to admin when someone submits a contact form
   */
  adminContactSubmission: (params: { name: string; email: string; message: string; subject: string }) => ({
    to: BUSINESS_CONFIG.email.notifications,
    from: `${BUSINESS_CONFIG.name} <${BUSINESS_CONFIG.email.noreply}>`,
    subject: `New contact submission: ${params.subject}`,
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333;">
    <h2>New Contact Submission</h2>
    <p><strong>From:</strong> ${params.name} (${params.email})</p>
    <p><strong>Subject:</strong> ${params.subject}</p>
    <p><strong>Message:</strong></p>
    <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #3b82f6;">${params.message}</p>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
  </body>
</html>
    `,
  }),
}
