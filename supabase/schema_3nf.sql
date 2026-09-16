-- ==============================================================================
-- TRAVERSI DATABASE SCHEMA (Level 3NF - Third Normal Form)
-- Compatible with Supabase (PostgreSQL 15+) & Google OAuth
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLE DEFINITIONS (3NF COMPLIANT)
-- ==============================================================================

-- 2.1 PROFILES TABLE
-- 1NF: Atomic columns (no array/repeating groups).
-- 2NF: All columns fully dependent on PK (id).
-- 3NF: No transitive dependencies.
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  passport_country TEXT DEFAULT 'Malaysia (MY)' NOT NULL,
  is_registered BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2.2 DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS public.destinations (
  id TEXT PRIMARY KEY,                       -- e.g. 'krabi', 'langkawi', 'bali'
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code VARCHAR(3) NOT NULL,          -- e.g. 'TH', 'MY', 'ID'
  iata_code VARCHAR(3) NOT NULL,             -- e.g. 'KBV', 'LGK', 'DPS'
  tagline TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2.3 USER STARRED DESTINATIONS (Junction Table for M:N Relationship)
-- 1NF: Eliminates arrays in profiles.
-- 2NF: Composite key (user_id, destination_id), starred_at depends on full PK.
-- 3NF: No transitive attributes.
CREATE TABLE IF NOT EXISTS public.user_starred_destinations (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  destination_id TEXT NOT NULL REFERENCES public.destinations(id) ON DELETE CASCADE,
  starred_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (user_id, destination_id)
);

-- 2.4 USER SEARCH / CALCULATION HISTORY
-- 1NF, 2NF, 3NF: Each budget search query is an independent atomic record.
CREATE TABLE IF NOT EXISTS public.user_search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  origin_iata VARCHAR(3) NOT NULL DEFAULT 'KUL',
  budget_rm NUMERIC(10, 2) NOT NULL,
  days INT NOT NULL,
  pax INT NOT NULL,
  vibe TEXT DEFAULT 'all',
  calculated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2.5 USER AUTHENTICATION & SESSION AUDIT LOGS
-- Records sign up, sign in, and account delete events
CREATE TABLE IF NOT EXISTS public.user_auth_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  action TEXT NOT NULL,                      -- 'SIGN_UP', 'SIGN_IN', 'ACCOUNT_DELETED'
  provider TEXT DEFAULT 'google' NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 3. SEED DEFAULT DESTINATIONS
-- ==============================================================================
INSERT INTO public.destinations (id, city, country, country_code, iata_code, tagline, image_url)
VALUES
  ('krabi', 'Krabi', 'Thailand', 'TH', 'KBV', 'Pantai batu kapur megah & komuniti Muslim Ao Nang mesra', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80'),
  ('langkawi', 'Langkawi', 'Malaysia', 'MY', 'LGK', 'Pulau bebas cukai, pantai tenang & kereta sewa murah', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80'),
  ('da-nang', 'Da Nang', 'Vietnam', 'VN', 'DAD', 'Jambatan Naga, pantai berpasir luas & makanan jalanan murah', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'),
  ('bali', 'Bali', 'Indonesia', 'ID', 'DPS', 'Pantai meluncur, sawah bertingkat Ubud & kafe estetik mesra poket', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'),
  ('hat-yai', 'Hat Yai', 'Thailand', 'TH', 'HDY', 'Syurga makanan halal malam, tomyam kaw & tren terus ETS Padang Besar', 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80'),
  ('kota-kinabalu', 'Kota Kinabalu', 'Malaysia', 'MY', 'BKI', 'Matahari terbenam Tanjung Aru, pulau snorkel & makanan laut segar', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. AUTOMATIC SUPABASE TRIGGER (SYNC GOOGLE OAUTH USER TO PROFILES)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  extracted_name TEXT;
  extracted_avatar TEXT;
BEGIN
  -- Extract name from metadata or fallback to email
  extracted_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );

  -- Extract Google profile picture from user_metadata
  extracted_avatar := COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture',
    ''
  );

  -- 1. Insert or update public.profiles
  INSERT INTO public.profiles (id, email, full_name, avatar_url, is_registered, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    extracted_name,
    extracted_avatar,
    TRUE,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = CASE WHEN EXCLUDED.avatar_url <> '' THEN EXCLUDED.avatar_url ELSE public.profiles.avatar_url END,
    updated_at = NOW();

  -- 2. Audit log sign up / sign in event
  INSERT INTO public.user_auth_logs (user_id, email, action, provider)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN TG_OP = 'INSERT' THEN 'SIGN_UP' ELSE 'SIGN_IN' END,
    COALESCE(NEW.raw_app_meta_data->>'provider', 'google')
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to Supabase auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_starred_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_auth_logs ENABLE ROW LEVEL SECURITY;

-- 5.1 Destinations: Anyone can read (public directory)
CREATE POLICY "Public destinations viewable by all"
  ON public.destinations FOR SELECT
  USING (true);

-- 5.2 Profiles: Users can read and update their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 5.3 Starred Destinations: Users can select, insert, delete their own stars
CREATE POLICY "Users can view own starred destinations"
  ON public.user_starred_destinations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own starred destinations"
  ON public.user_starred_destinations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own starred destinations"
  ON public.user_starred_destinations FOR DELETE
  USING (auth.uid() = user_id);

-- 5.4 Search History: Users can view and insert own history
CREATE POLICY "Users can view own search history"
  ON public.user_search_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search history"
  ON public.user_search_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5.5 Auth Logs: Users can view own auth logs
CREATE POLICY "Users can view own auth logs"
  ON public.user_auth_logs FOR SELECT
  USING (auth.uid() = user_id);

-- ==============================================================================
-- 6. PERMANENT ACCOUNT DELETION FUNCTION (SECURITY DEFINER)
-- Enables authenticated users to permanently delete their own account from Supabase
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS void AS $$
DECLARE
  target_id UUID;
  target_email TEXT;
BEGIN
  target_id := auth.uid();

  IF target_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT email INTO target_email FROM public.profiles WHERE id = target_id;

  -- 1. Log audit event before deletion
  INSERT INTO public.user_auth_logs (user_id, email, action, provider)
  VALUES (target_id, COALESCE(target_email, 'unknown'), 'ACCOUNT_DELETED', 'google');

  -- 2. Delete user profile (cascades to user_starred_destinations, search_history)
  DELETE FROM public.profiles WHERE id = target_id;

  -- 3. Delete from Supabase auth.users permanently!
  DELETE FROM auth.users WHERE id = target_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution permission to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;

