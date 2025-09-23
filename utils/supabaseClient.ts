import { createClient } from '@supabase/supabase-js';

// Read envs without non-null assertions so we can validate at runtime
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	// Fail fast with a clear message in development. In production this will surface in logs.
	throw new Error(
		'Supabase env vars are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment (.env.local).'
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
