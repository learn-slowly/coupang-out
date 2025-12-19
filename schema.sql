-- Mission Posts Table
CREATE TABLE mission_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  display_url TEXT, -- In case we separate optimization later
  
  -- Simple verification flags
  is_approved BOOLEAN DEFAULT TRUE
);

-- Index for sorting by date
CREATE INDEX idx_mission_posts_created_at ON mission_posts (created_at DESC);

-- Storage (Bucket Creation)
-- Note: Must be created in dashboard manually usually, but policy can be set here.
-- Bucket name: 'mission-images'

-- Tables policies (RLS)
ALTER TABLE mission_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read posts
CREATE POLICY "Public profiles are viewable by everyone."
  ON mission_posts FOR SELECT
  USING ( true );

-- Allow anyone to upload (Anon)
CREATE POLICY "Anyone can upload a mission post."
  ON mission_posts FOR INSERT
  WITH CHECK ( true );

-- Storage Policies
-- Bucket: mission-images
-- Policy: Give public access to view
-- Policy: Give public access to upload (for Anon uploads)

-- Note: In production, consider stricter RLS with IP checking or Captcha verification on Edge Functions.
