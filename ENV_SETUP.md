# Environment Variables Setup Guide

## Required Configuration

Your AJEx Tech Empire application requires Supabase environment variables to function properly.

### Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project (casrjmlrfesxcbuymlde)
3. Click **Settings** → **API**
4. Copy the following values:

```
Project URL: https://casrjmlrfesxcbuymlde.supabase.co
Anon Public Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 2: Configure in v0 Settings

1. Open your v0 project settings (click settings button in top right)
2. Go to **Vars** tab
3. Add these environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Anon Public Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Service Role Key |
| `ADMIN_EMAIL` | admin@ajex-tech-empire.com |

### Step 3: Verify Configuration

Once variables are set:
1. Refresh your browser preview
2. Navigate to `/admin`
3. You should see the login page
4. Use credentials from ADMIN_PANEL_CREDENTIALS.md

### Step 4: Deploy to Vercel

When deploying to Vercel:

1. Go to https://vercel.com/dashboard
2. Open your AJEx Tech Empire project
3. Click **Settings** → **Environment Variables**
4. Add the same variables as above
5. Redeploy the project

## Troubleshooting

### "Your project's URL and Key are required" Error

**Cause:** Environment variables are not set

**Fix:**
1. Verify variables are added in v0 Settings → Vars
2. Hard refresh the preview (Ctrl+Shift+R or Cmd+Shift+R)
3. Check that variable values are not empty or incomplete

### Variables Show But Still Get Error

**Cause:** Preview cache issue

**Fix:**
1. Clear browser cache
2. Close and reopen v0 preview tab
3. Click "Redeploy" in v0 dashboard

### Environment Variables Missing in Deployment

**Cause:** Vercel environment variables not configured

**Fix:**
1. Add variables to Vercel project settings
2. Ensure variables are visible before deployment
3. Trigger a new deployment after adding variables

## Environment Variables Explained

### Required Variables

- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL
  - Used for: Database, authentication, real-time subscriptions
  - Format: `https://[project-id].supabase.co`

- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Anonymous access key
  - Used for: Client-side authentication and data access
  - Prefix: `eyJhbGci...` (long JWT token)

### Optional Variables

- **SUPABASE_SERVICE_ROLE_KEY**: Service role key for server operations
  - Used for: Admin operations, secure backend calls

- **ADMIN_EMAIL**: Admin notification email
  - Used for: Receiving lead and booking notifications
  - Default: `admin@ajex-tech-empire.com`

## Next Steps

1. ✅ Add environment variables to v0 settings
2. ✅ Verify preview is working
3. ✅ Login to `/admin` with credentials
4. ✅ Add your company data
5. ✅ Deploy to Vercel
6. ✅ Add same variables to Vercel project

---

**Need Help?**
- Check Supabase dashboard for correct credentials
- Verify URL format includes `https://`
- Ensure anon key is not truncated
