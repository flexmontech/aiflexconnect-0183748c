CREATE TABLE public.community_join_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  resume_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.community_join_requests TO service_role;
ALTER TABLE public.community_join_requests ENABLE ROW LEVEL SECURITY;