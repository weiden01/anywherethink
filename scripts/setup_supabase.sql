-- Trade Journal Database Schema
-- Run this in Supabase SQL Editor

-- 1. Create trades table
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  company TEXT NOT NULL,
  signal_detail TEXT,
  target_price TEXT,
  profit_loss DECIMAL(15,2),
  entry_time TEXT,
  first_action TEXT,
  second_action TEXT,
  query_notes TEXT,
  investment DECIMAL(15,2) DEFAULT 10000000,
  profit_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE
      WHEN investment > 0 THEN (profit_loss / investment) * 100
      ELSE 0
    END
  ) STORED,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS trades_date_idx ON trades(date DESC);
CREATE INDEX IF NOT EXISTS trades_company_idx ON trades(company);
CREATE INDEX IF NOT EXISTS trades_created_at_idx ON trades(created_at DESC);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Allow authenticated users to view their own data
-- Note: Change this based on your auth setup
-- For single user: Allow all operations
CREATE POLICY "Enable all access" ON trades
  FOR ALL USING (true) WITH CHECK (true);

-- 5. Realtime subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE trades;

-- 6. Create storage bucket for images (via dashboard)
-- Name: trade-images
-- Public: false (private, controlled by RLS)

-- 7. Storage RLS Policy for authenticated users
-- Via Dashboard: Storage → trade-images → Policies
-- - SELECT: auth.uid() is not null
-- - INSERT: auth.uid() is not null
-- - UPDATE: auth.uid() is not null
-- - DELETE: auth.uid() is not null

-- Done! Your trades table is ready to use.
