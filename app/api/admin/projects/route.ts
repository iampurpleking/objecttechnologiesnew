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
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ projects: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to load projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const { name, client, status, progress, deadline } = await req.json();
    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

    const supabase = adminClient();
    const { data, error } = await supabase
      .from('projects')
      .insert({ name, client, status, progress, deadline, created_by: auth.userId })
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ project: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to create project' }, { status: 500 });
  }
}
