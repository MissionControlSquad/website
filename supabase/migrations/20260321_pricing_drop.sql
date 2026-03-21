-- ─────────────────────────────────────────────────────────────────────────────
-- pricing_drop_signups
--
-- Deduplication layers:
--   1. email_normalized  — unique constraint (dots stripped, +tag removed)
--   2. ip_hash           — unique constraint, one signup per IP
--   3. localStorage      — client-side guard (first line of defence)
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop and recreate cleanly so partial previous runs don't leave a broken state.
DROP TABLE IF EXISTS pricing_drop_signups CASCADE;

CREATE TABLE pricing_drop_signups (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email             text        NOT NULL,           -- original, used to send emails
  email_normalized  text        NOT NULL UNIQUE,    -- canonical, used for dedup
  ip_hash           text        UNIQUE,             -- SHA-256(salt+IP), never raw IP
  created_at        timestamptz DEFAULT now()
);

-- ── Row Level Security ────────────────────────────────────────────────────────
ALTER TABLE pricing_drop_signups ENABLE ROW LEVEL SECURITY;
-- Service key (used by CF function) bypasses RLS — no anon policies needed.

-- ── RPCs ─────────────────────────────────────────────────────────────────────

-- Returns total signup count (used by the public counter on the page)
CREATE OR REPLACE FUNCTION get_pricing_drop_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::bigint FROM pricing_drop_signups;
$$;

GRANT EXECUTE ON FUNCTION get_pricing_drop_count() TO anon;
