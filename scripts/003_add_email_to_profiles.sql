-- Add email column to profiles table if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Add index for email lookups (only if column is new)
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- Update existing profiles with email from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;
