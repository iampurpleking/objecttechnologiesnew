import { NextResponse } from 'next/server';

// You must set SUPABASE_SERVICE_ROLE_KEY in your Vercel/production environment for security
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }
  if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
    return NextResponse.json({ error: 'Supabase service role key or URL missing.' }, { status: 500 });
  }

  // Use Supabase Admin API to create user and send invite
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({
      email,
      email_confirm: false,
      // Optionally set a password or let user set it via invite link
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: data.message || 'Failed to invite user.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, user: data });
}
