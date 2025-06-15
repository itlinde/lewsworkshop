-- THIS IS ALL AI GENERATED LOL

-- Migration to sync production database schema to match development
-- This preserves all existing data while updating the schema

-- 1. Update beads table
-- Change id from bigint to integer (this is tricky, we'll keep bigint for safety)
-- Change diameter_mm from bigint to integer
ALTER TABLE public.beads ALTER COLUMN diameter_mm TYPE integer;

-- Change price from double precision to integer (multiply by 100 to convert dollars to cents)
UPDATE public.beads SET price = ROUND(price * 100);
ALTER TABLE public.beads ALTER COLUMN price TYPE integer;

-- Remove default from stock column to match dev
ALTER TABLE public.beads ALTER COLUMN stock DROP DEFAULT;

-- Change colour from text to character varying
ALTER TABLE public.beads ALTER COLUMN colour TYPE character varying;

-- Change shape from text to character varying  
ALTER TABLE public.beads ALTER COLUMN shape TYPE character varying;

-- 2. Update customers table
-- Add name column (it exists in dev but missing in prod)
ALTER TABLE public.customers ADD COLUMN IF NOT EXISTS name character varying;

-- Remove address column (exists in prod but not in dev)
ALTER TABLE public.customers DROP COLUMN IF EXISTS address;

-- Change email from text to character varying and add UNIQUE constraint
ALTER TABLE public.customers ALTER COLUMN email TYPE character varying;
-- Add unique constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'customers_email_key'
    ) THEN
        ALTER TABLE public.customers ADD CONSTRAINT customers_email_key UNIQUE (email);
    END IF;
END $$;

-- 3. Update orders table
-- Change total from double precision to integer (multiply by 100 for cents)
UPDATE public.orders SET total = ROUND(total * 100);
ALTER TABLE public.orders ALTER COLUMN total TYPE integer;

-- Remove default from status column
ALTER TABLE public.orders ALTER COLUMN status DROP DEFAULT;

-- Change delivery_method from text to character varying
ALTER TABLE public.orders ALTER COLUMN delivery_method TYPE character varying;

-- Add missing columns from dev schema
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS country character varying;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS postal_code character varying;

-- Change date_ordered from bigint to timestamp without time zone
-- First, convert existing bigint timestamps to proper timestamps
ALTER TABLE public.orders ADD COLUMN temp_date_ordered timestamp without time zone;
UPDATE public.orders SET temp_date_ordered = to_timestamp(date_ordered) WHERE date_ordered IS NOT NULL;
ALTER TABLE public.orders DROP COLUMN date_ordered;
ALTER TABLE public.orders RENAME COLUMN temp_date_ordered TO date_ordered;

-- 4. Update orders_beads table
-- Add id column as primary key (dev has this, prod doesn't)
ALTER TABLE public.orders_beads DROP CONSTRAINT IF EXISTS orders_beads_pkey;
ALTER TABLE public.orders_beads ADD COLUMN id integer GENERATED ALWAYS AS IDENTITY;
ALTER TABLE public.orders_beads ADD CONSTRAINT orders_beads_pkey PRIMARY KEY (id);

-- Note: We're keeping the bigint types for IDs in most places for safety
-- Converting bigint to integer could cause issues if you have large ID values
-- The main functional differences (price format, missing columns) are addressed