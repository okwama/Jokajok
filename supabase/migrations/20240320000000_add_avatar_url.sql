-- Add avatar_url column to profiles table
ALTER TABLE profiles
ADD COLUMN avatar_url TEXT;

-- Add RLS policy for avatar_url
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to read any avatar
CREATE POLICY "Anyone can read avatars"
ON profiles
FOR SELECT
USING (true); 