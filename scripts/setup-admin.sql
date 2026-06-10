-- Setup script for AJEx Tech Empire Admin Account
-- Run this script in your Supabase SQL editor to create the default CEO account

-- Note: This script requires the user to be created first through Supabase Auth
-- After running this, use the credentials:
-- Email: admin@ajex-tech-empire.com
-- Password: AJEx2024!Admin#Secure

-- This is a placeholder SQL file
-- In production, create the admin user through Supabase Auth dashboard:
-- 1. Go to Supabase Auth Dashboard
-- 2. Click "Add user"
-- 3. Email: admin@ajex-tech-empire.com
-- 4. Password: AJEx2024!Admin#Secure
-- 5. Auto confirm the email

-- Then run this query to set the role:
-- UPDATE public.profiles 
-- SET role = 'ceo', first_name = 'AJEx', last_name = 'Admin'
-- WHERE email = 'admin@ajex-tech-empire.com';

-- For development: Create test accounts
-- Test CEO
INSERT INTO auth.users (email, email_confirmed_at, encrypted_password, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, last_sign_in_at, confirmation_token, recovery_token)
VALUES (
  'admin@ajex-tech-empire.com',
  NOW(),
  crypt('AJEx2024!Admin#Secure', gen_salt('bf')),
  '{"provider":"email","providers":["email"]}',
  '{"name":"AJEx Admin"}',
  false,
  NOW(),
  NOW(),
  NOW(),
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create matching profile for CEO
INSERT INTO public.profiles (id, email, first_name, last_name, company_name, role, created_at, updated_at)
SELECT 
  id,
  email,
  'AJEx',
  'Admin',
  'AJEx Tech Empire',
  'ceo',
  NOW(),
  NOW()
FROM auth.users 
WHERE email = 'admin@ajex-tech-empire.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'ceo', 
    first_name = 'AJEx', 
    last_name = 'Admin',
    updated_at = NOW();

-- Create test worker account
INSERT INTO auth.users (email, email_confirmed_at, encrypted_password, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, last_sign_in_at, confirmation_token, recovery_token)
VALUES (
  'worker@ajex-tech-empire.com',
  NOW(),
  crypt('Worker2024!Secure', gen_salt('bf')),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test Worker"}',
  false,
  NOW(),
  NOW(),
  NOW(),
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create matching profile for worker
INSERT INTO public.profiles (id, email, first_name, last_name, company_name, role, created_at, updated_at)
SELECT 
  id,
  email,
  'Test',
  'Worker',
  'AJEx Tech Empire',
  'worker',
  NOW(),
  NOW()
FROM auth.users 
WHERE email = 'worker@ajex-tech-empire.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'worker', 
    first_name = 'Test', 
    last_name = 'Worker',
    updated_at = NOW();

-- Create test client account
INSERT INTO auth.users (email, email_confirmed_at, encrypted_password, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, last_sign_in_at, confirmation_token, recovery_token)
VALUES (
  'client@ajex-tech-empire.com',
  NOW(),
  crypt('Client2024!Secure', gen_salt('bf')),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test Client"}',
  false,
  NOW(),
  NOW(),
  NOW(),
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Create matching profile for client
INSERT INTO public.profiles (id, email, first_name, last_name, company_name, role, created_at, updated_at)
SELECT 
  id,
  email,
  'Test',
  'Client',
  'Client Corp',
  'client',
  NOW(),
  NOW()
FROM auth.users 
WHERE email = 'client@ajex-tech-empire.com'
ON CONFLICT (id) DO UPDATE 
SET role = 'client', 
    first_name = 'Test', 
    last_name = 'Client',
    updated_at = NOW();

-- Verify accounts were created
SELECT email, (raw_user_meta_data->>'name') as name FROM auth.users WHERE email LIKE '%@ajex-tech-empire.com%' OR email LIKE '%@ajex-tech-empire.com%';
