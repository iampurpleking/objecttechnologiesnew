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

// Note: In Next.js 15, context.params may be a Promise. Use a generic context and await params.
export async function PATCH(req: Request, context: any) {
  const { id } = await context.params;
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const body = await req.json();
    const updateFields = { ...body };
    delete updateFields.id;
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('projects')
      .update(updateFields)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ project: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to update project' }, { status: 500 });
  }
}