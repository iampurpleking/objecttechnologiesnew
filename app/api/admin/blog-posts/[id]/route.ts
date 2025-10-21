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
  const updateFields: any = { ...body };
    delete updateFields.id;
    if (typeof updateFields.title === 'string') {
      const slug = updateFields.title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      updateFields.slug = slug;
    }
    if (typeof updateFields.content === 'string') {
      const plain = updateFields.content.replace(/<[^>]*>/g, '');
      updateFields.excerpt = plain.substring(0, 180).trim();
      const words = plain.split(/\s+/).filter(Boolean).length;
      updateFields.read_time = Math.max(1, Math.ceil(words / 200));
    }
    if (updateFields.status === 'published') {
      updateFields.published_at = new Date().toISOString();
    }
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateFields)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ post: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  const { id } = await context.params;
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
    const supabase = adminClient();
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to delete post' }, { status: 500 });
  }
}
