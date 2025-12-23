# AJEx Tech Empire - Production Deployment Guide

## Project Status: PRODUCTION READY

This document provides everything needed to deploy and maintain AJEx Tech Empire in production.

## What Has Been Built

### Authentication System (COMPLETE)
- Email/password authentication with Supabase
- Mandatory email verification flow
- Secure callback route at `/auth/callback`
- Session management with HTTP-only cookies
- Redirect logic for admin vs client users

### Authorization System (COMPLETE)
- Role-Based Access Control (RBAC) with Admin/Client roles
- Route protection via middleware
- Component-level role enforcement
- Row Level Security (RLS) on all database tables
- Per-user data isolation

### Admin Dashboard (COMPLETE)
- Protected admin panel at `/admin`
- User management interface
- Business statistics and metrics
- Access control for only admin-role users
- User list with email, role, and signup date

### Client Dashboard (COMPLETE)
- Protected client panel at `/dashboard`
- Profile management with edit functionality
- Account information display
- Sign-out capability
- Links to projects, invoices, and support

### Email System (COMPLETE)
- Supabase Auth email confirmation
- Email branding via configuration
- Support for custom transactional emails
- Production-ready architecture for integration with Resend/SendGrid

### Brand Assets (COMPLETE)
- Logo integrated into navbar and footer
- CEO photo (Isaac Ajeh) on homepage and about page
- Professional image optimization
- Consistent branding across all touchpoints

### Data Persistence (COMPLETE)
- Supabase PostgreSQL database
- User profiles table with roles
- Customer, project, invoice management tables
- Row Level Security policies on all tables
- Automatic session management

## Deployment Steps

### 1. Pre-Deployment Checklist

- [ ] All environment variables set in Vercel project
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (for local testing, remove from prod)

- [ ] Supabase project created and configured
- [ ] All database tables created with RLS enabled
- [ ] First admin user created (manually set role to "admin")
- [ ] Email configuration tested (confirmation emails working)
- [ ] SSL certificate configured (automatic with Vercel)

### 2. Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel automatically deploys from main branch
# Monitor deployment at https://vercel.com/dashboard
```

### 3. Post-Deployment Testing

- [ ] Test signup flow end-to-end
  - Create account with real email
  - Receive confirmation email
  - Click confirmation link
  - Redirects to `/auth/callback`
  - Session established

- [ ] Test login flow
  - Log in with credentials
  - Redirects to `/dashboard`
  - Client dashboard accessible

- [ ] Test admin access
  - Manually set user role to "admin" in Supabase
  - Log in with admin account
  - Redirects to `/admin`
  - Admin dashboard accessible
  - User list displays all users

- [ ] Test authentication protection
  - Try accessing `/admin` without admin role → should redirect
  - Try accessing `/dashboard` without auth → should redirect to `/auth/login`

- [ ] Test data privacy (RLS)
  - Client 1 logs in, views only their profile
  - Client 2 logs in, cannot see Client 1's data
  - Each user isolated at database level

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  Browser / Client                    │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│            Next.js 14 App Router (Vercel)            │
├─────────────────────────────────────────────────────┤
│  Public Routes:                                     │
│  /                                                  │
│  /about, /services, /work, /blog, /contact        │
│                                                     │
│  Auth Routes:                                       │
│  /auth/login, /auth/signup, /auth/callback         │
│  /auth/verify-email                                │
│                                                     │
│  Protected Routes:                                  │
│  /dashboard      (clients)                          │
│  /admin         (admins)                            │
└─────────────────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ↓               ↓               ↓
    ┌─────────┐   ┌──────────┐   ┌──────────────┐
    │Middleware│   │Components│   │API Routes    │
    │(SSR)     │   │(Client)  │   │(Server)      │
    └─────────┘   └──────────┘   └──────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         ↓
         ┌───────────────────────────────┐
         │   Supabase Auth & Database    │
         ├───────────────────────────────┤
         │  PostgreSQL:                  │
         │  - profiles (with roles)      │
         │  - customers                  │
         │  - projects                   │
         │  - invoices                   │
         │  - products                   │
         │                               │
         │  Auth:                        │
         │  - Email/password             │
         │  - Session management         │
         │  - Email confirmation         │
         │  - Password reset             │
         └───────────────────────────────┘
```

## Configuration Guide

### Business Information (`lib/config.ts`)

```typescript
BUSINESS_CONFIG = {
  name: "AJEx Tech Empire",
  tagline: "Premium Digital Growth Agency",
  founder: "Isaac Ajeh",
  email: {
    primary: "ajexlink@gmail.com",
    support: "support@ajextechempire.com",
    noreply: "noreply@ajextechempire.com",
  },
  auth: {
    emailVerificationRequired: true,
    redirectAfterConfirm: "/auth/login",
  },
  // ... more config
}
```

To change:
1. Update `lib/config.ts`
2. Redeploy to Vercel

### Feature Flags (`lib/config.ts`)

Enable/disable features without code changes:

```typescript
features: {
  payments: false,        // Will enable payment processing
  subscriptions: false,   // Will enable subscription model
  orders: false,          // Will enable order management
  invoices: false,        // Will enable invoicing
  aiTools: false,         // Will enable AI features
  chatbot: false,         // Will enable chatbot
  analytics: false,       // Will enable analytics
  multiTenant: false,     // Will enable multi-tenant
}
```

## Security Considerations

### Password Security
- Bcrypt hashing with salt handled by Supabase
- Minimum 8 characters
- Can enforce stronger requirements in signup form

### Session Management
- HTTP-only cookies (cannot be accessed by JavaScript)
- Secure flag (only sent over HTTPS)
- SameSite protection against CSRF
- 7-day default duration (configurable)

### Data Privacy
- Row Level Security (RLS) on all tables
- Users can only see their own data
- Admin can see all user data
- No sensitive data in client-side state

### API Security
- All admin routes require authentication
- All admin routes verify admin role
- Server-side validation on all inputs
- No secrets exposed in client code

## Email Configuration (Production)

Currently uses Supabase's built-in email for auth emails (signup confirmation, password reset).

To set up custom transactional emails:

### Option 1: Resend (Recommended)
```typescript
// lib/email/send.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(params: EmailParams) {
  const { data, error } = await resend.emails.send({
    from: params.from,
    to: params.to,
    subject: params.subject,
    html: params.html,
  })
  if (error) throw error
  return { success: true, messageId: data?.id }
}
```

### Option 2: SendGrid
```typescript
// lib/email/send.ts
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmail(params: EmailParams) {
  await sgMail.send({
    to: params.to,
    from: params.from,
    subject: params.subject,
    html: params.html,
  })
  return { success: true }
}
```

## Database Backups

Supabase automatically:
- Backs up daily
- Retains backups for 30 days
- Allows point-in-time recovery

To restore:
1. Go to Supabase dashboard
2. Database → Backups
3. Select backup point
4. Click "Restore"

## Monitoring & Logging

### Access Admin Dashboard
- URL: `https://ajextechempire.com/admin`
- View: User signups, system stats, activity

### Check Supabase Logs
- Supabase dashboard → Logs
- Monitor: Auth events, database queries, errors

### Error Tracking
Can be enhanced with:
- Sentry (error monitoring)
- LogRocket (session replay)
- DataDog (application monitoring)

## Scaling Considerations

Current setup handles:
- Up to 10,000 concurrent users (Supabase standard)
- Unlimited storage with PostgreSQL
- 5 million API requests/month (Supabase standard)

To scale further:
- Upgrade Supabase plan
- Add caching layer (Redis)
- Enable CDN for static assets (already on Vercel)
- Database optimization (indexing, query optimization)

## Maintenance Schedule

### Weekly
- [ ] Monitor admin dashboard for errors
- [ ] Check Supabase logs for anomalies

### Monthly
- [ ] Review user signups and activity
- [ ] Update dependencies (`npm update`)
- [ ] Check security alerts

### Quarterly
- [ ] Review and optimize database queries
- [ ] Audit user access and permissions
- [ ] Plan feature implementations

## Troubleshooting

### Users can't receive confirmation emails
- Check Supabase email settings
- Verify email domain is properly configured
- Check spam folder
- Verify email address is valid

### Admin user cannot access `/admin`
- Verify user's `profiles.role` is set to "admin"
- User must log out and back in after role change
- Check RLS policy on profiles table

### Session expires too quickly
- Increase `sessionDuration` in `lib/config.ts`
- Check browser cookie settings
- Verify HTTPS is enabled (required for secure cookies)

### Performance is slow
- Check Supabase query performance
- Verify indexes exist on frequently queried columns
- Review API response times in Vercel Analytics
- Check if hitting rate limits

## Contact & Support

For technical issues:
- Supabase Support: https://supabase.com/support
- Vercel Support: https://vercel.com/help
- Documentation: See `SAAS_SETUP_GUIDE.md`

---

**Document Version:** 1.0
**Last Updated:** December 2025
**Maintainer:** AJEx Tech Empire Team
**Status:** Production Ready
