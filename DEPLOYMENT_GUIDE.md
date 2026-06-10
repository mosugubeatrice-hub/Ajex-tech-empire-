# AJEx Tech Empire - Production Deployment Guide

## 🚀 Quick Start Deployment

### Prerequisites
- GitHub repository connected
- Vercel account
- Supabase project with credentials

---

## Step 1: Prepare Environment Variables

Add these to your Vercel project settings:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_URL=https://your-project.supabase.co

# Email Configuration
ADMIN_EMAIL=admin@ajex-tech-empire.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Optional
POSTGRES_URL=your-connection-string
\`\`\`

---

## Step 2: Deploy to Vercel

### Option A: Git Push (Recommended)
\`\`\`bash
git add .
git commit -m "Production deployment"
git push origin main
\`\`\`
Vercel will automatically deploy on push to main branch.

### Option B: Manual Deploy
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables
5. Click Deploy

---

## Step 3: Database Setup

### Run Initial Migrations
1. Go to Supabase Dashboard
2. Open SQL Editor
3. Execute `/scripts/setup-admin.sql`
4. This creates:
   - Admin CEO account
   - Test worker account
   - Test client account
   - Sample data

---

## Step 4: Create Admin Account

### Via Supabase Auth
1. Supabase Dashboard → Authentication → Users
2. Click "Add user"
3. Email: `admin@ajex-tech-empire.com`
4. Password: `AJEx2024!Admin#Secure`
5. Check "Auto confirm email"
6. Click Create User

### Update Profile Role
In Supabase SQL Editor:
\`\`\`sql
UPDATE public.profiles 
SET role = 'ceo' 
WHERE email = 'admin@ajex-tech-empire.com';
\`\`\`

---

## Step 5: Verify Deployment

### Check Live Site
- [ ] Homepage loads with full brand name "AJEx Tech Empire"
- [ ] Navigation displays correctly
- [ ] Admin panel accessible at `/admin`
- [ ] Can sign in with admin credentials
- [ ] All dashboards load with real data

### Test Admin Features
- [ ] User management working
- [ ] Leads capture working
- [ ] Bookings system functional
- [ ] Email notifications sending
- [ ] Reports generating

---

## Post-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Enable 2FA in Supabase
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up backup plan

### Content
- [ ] Update About page with your info
- [ ] Add real portfolio/case studies
- [ ] Update services/pricing
- [ ] Configure contact email
- [ ] Add team information

### Optimization
- [ ] Verify analytics are tracking
- [ ] Test mobile responsiveness
- [ ] Check page load speed
- [ ] Test all forms
- [ ] Verify email delivery

### Monitoring
- [ ] Set up error tracking
- [ ] Enable performance monitoring
- [ ] Configure alerts
- [ ] Monitor database usage
- [ ] Track API calls

---

## Admin Panel Access

### URL
\`\`\`
https://your-domain.com/admin
\`\`\`

### Credentials
- Email: `admin@ajex-tech-empire.com`
- Password: `AJEx2024!Admin#Secure`

⚠️ **Change this password immediately after first login!**

---

## Troubleshooting

### 401 Unauthorized
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY
- Ensure user email is confirmed in Supabase

### No Data Showing
- Verify Supabase connection
- Check RLS policies are correct
- Ensure user has proper role
- Check database has sample data

### Email Not Sending
- Verify EMAIL_USER and EMAIL_PASSWORD
- Check email is unlocked in Gmail
- Use app-specific password, not main password
- Check spam folder

### Pages Won't Load
- Check Vercel deployment logs
- Verify environment variables are set
- Check Next.js build errors
- Clear browser cache

---

## Scaling & Performance

### Database Optimization
- Enable Read Replicas in Supabase
- Set up connection pooling
- Monitor query performance
- Archive old data regularly

### CDN & Caching
- Vercel automatically caches assets
- Enable ISR (Incremental Static Regeneration)
- Optimize images with Next.js Image
- Use proper cache headers

### Monitoring
- Set up Vercel Analytics
- Monitor error rates
- Track API latencies
- Set up alerts for failures

---

## Maintenance

### Weekly
- Check admin panel for new leads
- Review booking requests
- Monitor error logs
- Verify email delivery

### Monthly
- Update blog content
- Review analytics
- Update case studies
- Check security alerts

### Quarterly
- Performance review
- Database cleanup
- Update dependencies
- Security audit

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

---

**Deployment Status:** ✅ Ready for Production
**Last Updated:** 2026-03-23
**Next Review:** 2026-06-23
