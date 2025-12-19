-- 1. Create Tables (If not exists)
CREATE TABLE IF NOT EXISTS mission_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  display_url TEXT,
  is_approved BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_mission_posts_created_at ON mission_posts (created_at DESC);

ALTER TABLE mission_posts ENABLE ROW LEVEL SECURITY;

-- 2. Create Storage Bucket (mission-images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mission-images', 'mission-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Reset & Create Policies (Idempotent)

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON mission_posts;
DROP POLICY IF EXISTS "Anyone can upload a mission post." ON mission_posts;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;

-- Re-create DB Policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON mission_posts FOR SELECT
  USING ( true );

CREATE POLICY "Anyone can upload a mission post."
  ON mission_posts FOR INSERT
  WITH CHECK ( true );

-- Re-create Storage Policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'mission-images' );

CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'mission-images' );
