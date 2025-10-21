import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function userClient(authHeader?: string | null) {
  return createClient(url, anonKey, {
    global: {
      headers: authHeader ? { Authorization: authHeader } : {},
    },
  });
}

function adminClient() {
  return createClient(url, serviceKey);
}

async function requireAdmin(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return { ok: false as const, status: 401, message: 'Missing Authorization header' };
  }
  const supaUser = userClient(authHeader);
  const { data: userData, error: userError } = await supaUser.auth.getUser();
  if (userError || !userData.user) {
    return { ok: false as const, status: 401, message: 'Invalid or expired token' };
  }
  const supaAdmin = adminClient();
  const { data: adminRow, error: adminErr } = await supaAdmin
    .from('admin_users')
    .select('user_id, role')
    .eq('user_id', userData.user.id)
    .maybeSingle();
  if (adminErr) {
    return { ok: false as const, status: 500, message: adminErr.message };
  }
  if (!adminRow) {
    return { ok: false as const, status: 403, message: 'Admin access required' };
  }
  return { ok: true as const, userId: userData.user.id, role: adminRow.role };
}

export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const supabase = adminClient();
    const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ admins: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to load admins' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const { user_id, email, role } = await req.json();
    if (!user_id || !email) return NextResponse.json({ error: 'user_id and email are required' }, { status: 400 });
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('admin_users')
      .insert({ user_id, email, role: role || 'admin', created_by: auth.userId })
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ admin: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to create admin' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
    if (!user_id) return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    const supabase = adminClient();
    const { error } = await supabase.from('admin_users').delete().eq('user_id', user_id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to remove admin' }, { status: 500 });
  }
}
