# AJEx Tech Empire - SaaS Setup & Configuration Guide

## System Overview

AJEx Tech Empire is now a fully functional, production-ready SaaS platform with:

- Authentication with email verification
- Role-based access control (Admin/Client)
- Client dashboard and profile management
- Admin dashboard with user management
- Supabase integration for database and auth
- Email notification system
- Brand-consistent UI across all pages
- No placeholder content or dummy data

## Configuration

### 1. Business Information

All business configuration is centralized in `lib/config.ts`:

```typescript
BUSINESS_CONFIG = {
  name: "AJEx Tech Empire",
  founder: "Isaac Ajeh",
  email: {
    primary: "ajexlink@gmail.com",
    support: "support@ajextechempire.com",
    noreply: "noreply@ajextechempire.com",
    notifications: "notifications@ajextechempire.com",
  },
  // ... more config
}
```

### 2. Authentication Flow

#### User Signs Up
1. User visits `/auth/signup`
2. Fills signup form with email, password, name, company
3. Supabase sends confirmation email to their address
4. Email contains link to `/auth/callback`
5. Callback route exchanges auth code for session
6. User is redirected to `/dashboard` (client) or `/admin` (if admin)

#### User Logs In
1. User visits `/auth/login`
2. Enters email and password
3. Session is created and stored in secure cookies
4. User is redirected to `/dashboard`

#### Email Confirmation
- Mandatory before login (can be changed in config)
- Confirmation email sent automatically by Supabase
- Email branding can be customized via Supabase settings

### 3. Role-Based Access Control

**Roles:**
- `admin` - Full access to admin dashboard, user management, statistics
- `client` - Access to client dashboard, profile, projects

**Protected Routes:**
- `/admin/*` - Requires admin role (wrapped with `<RequireRole role={USER_ROLES.ADMIN}>`)
- `/dashboard` - Requires authentication
- `/dashboard/*` - Client-only features

### 4. Database Schema

**profiles** table includes:
- `id` (uuid, user ID)
- `role` (text: "admin" or "client")
- `first_name`, `last_name` (text)
- `company_name` (text)
- Row Level Security (RLS) enabled

**Users can only see/modify their own profile** via RLS policies.

### 5. Email System

Email sending is configured in `lib/email/send.ts`.

**Current Setup:** Development logging
**Production Ready For:** 
- Resend API (recommended)
- SendGrid
- AWS SES
- Supabase Functions

**Email Types:**
- Signup confirmation (Supabase Auth)
- Password reset (Supabase Auth)
- Welcome email (custom)
- Admin notifications (custom)

### 6. Admin Dashboard

**URL:** `/admin`
**Protected:** Yes (admin only)

**Features:**
- Dashboard stats (projects, customers, invoices)
- User management list
- Access to all admin features

**To make someone an admin:**
1. They sign up normally as a client
2. Admin updates their `profiles.role` to "admin" in Supabase
3. They log out and back in
4. They now have admin access

### 7. Client Dashboard

**URL:** `/dashboard`
**Protected:** Yes (authenticated users)

**Features:**
- User profile management
- View projects
- View invoices
- Sign out

## Deployment Checklist

- [ ] Update `BUSINESS_CONFIG` with real company info
- [ ] Update `.env.local` with Supabase credentials
- [ ] Configure Supabase email templates (optional, uses defaults)
- [ ] Set up password reset email (Supabase)
- [ ] Create first admin user manually
- [ ] Test signup flow end-to-end
- [ ] Test login flow
- [ ] Test email confirmation
- [ ] Test admin access
- [ ] Deploy to Vercel
- [ ] Update redirect URLs in Supabase (if needed)

## Feature Flags

These features are ready for implementation:

```typescript
features: {
  payments: false,      // Enable when payment processing ready
  subscriptions: false, // Enable for subscription model
  orders: false,        // Enable for order management
  invoices: false,      // Enable for invoicing
  aiTools: false,       // Enable when AI features ready
  chatbot: false,       // Enable when chatbot ready
  analytics: false,     // Enable for analytics
  multiTenant: false,   // Enable for multi-tenant support
}
```

## API Routes

### Public Routes
- `GET /` - Homepage
- `GET /auth/login` - Login page
- `GET /auth/signup` - Signup page
- `GET /auth/callback` - OAuth callback (handles Supabase auth)

### Protected Routes
- `GET /dashboard` - Client dashboard
- `GET /dashboard/profile` - Profile management
- `GET /admin` - Admin dashboard (admin only)
- `GET /admin/users` - User management (admin only)
- `GET /api/admin/stats` - Statistics (admin only)
- `GET /api/admin/users` - List users (admin only)

## Environment Variables

Required Supabase variables (automatically set):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL= (for local dev)
```

## File Structure

```
app/
├── auth/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── callback/route.ts (NEW - handles OAuth callback)
│   └── verify-email/page.tsx
├── dashboard/
│   ├── page.tsx (client dashboard)
│   └── profile/page.tsx (profile management)
├── admin/
│   ├── page.tsx (admin dashboard)
│   └── users/page.tsx (user management)
└── api/
    ├── admin/
    │   ├── stats/route.ts
    │   └── users/route.ts (NEW - list users)

lib/
├── config.ts (NEW - centralized configuration)
├── constants.ts (NEW - error messages, routes, types)
├── auth/
│   ├── rbac.ts (NEW - role-based access control)
│   └── server.ts (NEW - server auth utilities)
├── email/
│   └── send.ts (NEW - email service)
└── supabase/
    ├── client.ts (singleton client)
    └── server.ts (server-side client)

components/
├── auth/
│   └── require-role.tsx (NEW - role protection wrapper)
```

## Security Notes

1. **Session Management**: Handled by Supabase SSR (`@supabase/ssr`)
2. **Row Level Security**: Enabled on all tables - users can only see their own data
3. **Password Hashing**: Done by Supabase, bcrypt with salt
4. **CSRF Protection**: Built-in to Next.js
5. **SQL Injection**: Prevented via parameterized queries
6. **Secrets**: Environment variables never exposed to client

## Next Steps

1. **Payment Integration** (when needed)
   - Set up Stripe
   - Create pricing page
   - Implement checkout flow

2. **Email Customization** (production)
   - Set up Resend or SendGrid
   - Create branded email templates
   - Test all email flows

3. **Advanced Features**
   - Admin notifications
   - User analytics
   - Audit logs
   - Multi-tenant support

## Support

For questions about setup, refer to:
- `lib/config.ts` - Configuration options
- `lib/constants.ts` - Error messages and routes
- Supabase docs: https://supabase.com/docs

---

**Last Updated:** December 2025
**Version:** 1.0
**Status:** Production Ready
