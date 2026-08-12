-- User profiles (extends Supabase auth.users)

CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id          UUID REFERENCES organizations(id),
  full_name       TEXT NOT NULL,
  phone           TEXT,
  email           TEXT,
  avatar_url      TEXT,
  role            TEXT NOT NULL DEFAULT 'customer'
                  CHECK (role IN ('super_admin','org_admin','kitchen_manager',
                                  'production_staff','delivery_manager','customer')),
  city_id         UUID REFERENCES cities(id),
  kitchen_id      UUID REFERENCES kitchens(id),
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE addresses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label           TEXT DEFAULT 'Home',
  line1           TEXT NOT NULL,
  line2           TEXT,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  pincode         TEXT NOT NULL,
  lat             DECIMAL(10, 7),
  lng             DECIMAL(10, 7),
  zone_id         UUID REFERENCES delivery_zones(id),
  is_default      BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'User'),
    new.email,
    'customer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
