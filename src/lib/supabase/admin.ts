import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Using untyped client for admin operations (cron jobs, webhooks).
// In production, use Supabase CLI to auto-generate types: `supabase gen types typescript`
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
