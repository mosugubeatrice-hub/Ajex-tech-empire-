-- Update the profile trigger to handle role assignment and email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
  assigned_role TEXT;
BEGIN
  -- Check if this is the first user (should be CEO)
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  -- First user gets CEO role, subsequent users get client role
  IF user_count = 0 THEN
    assigned_role := 'ceo';
  ELSE
    assigned_role := 'client';
  END IF;

  INSERT INTO public.profiles (id, first_name, last_name, company_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'company_name', NULL),
    NEW.email,
    assigned_role
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Recreate the trigger with updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
