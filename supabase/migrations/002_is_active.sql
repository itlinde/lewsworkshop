-- Add soft-delete flags
ALTER TABLE public.beads ADD COLUMN is_active int2 NOT NULL DEFAULT 1;
ALTER TABLE public.orders ADD COLUMN is_active int2 NOT NULL DEFAULT 1;
ALTER TABLE public.customers ADD COLUMN is_active int2 NOT NULL DEFAULT 1;

-- Add created timestamp fields
-- note: not adding date_added to orders as it already has a date_ordered column
ALTER TABLE public.beads ADD COLUMN date_added timestamp NOT NULL DEFAULT NOW();
ALTER TABLE public.customers ADD COLUMN date_added timestamp NOT NULL DEFAULT NOW();

