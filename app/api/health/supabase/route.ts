import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const ok = Boolean(url && anon);
  const body = {
    ok,
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(anon),
  };

  return NextResponse.json(body, { status: ok ? 200 : 500 });
}
