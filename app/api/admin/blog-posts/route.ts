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
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ posts: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to load posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });
  try {
  const { title, content, status, author, category, tags, image_url } = await req.json();
    if (!title || !content) return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });

    // Derive fields commonly used by the public blog
    const slug = title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    const plain = content.toString().replace(/<[^>]*>/g, '');
    const excerpt = plain.substring(0, 180).trim();
    const words = plain.split(/\s+/).filter(Boolean).length;
    const read_time = Math.max(1, Math.ceil(words / 200));

    const supabase = adminClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        content,
        status: status || 'draft',
        author,
        slug,
        excerpt,
        read_time,
        category: category || 'General',
        tags: Array.isArray(tags) ? tags : null,
        image_url: image_url || null,
        published_at: status === 'published' ? new Date().toISOString() : null,
      })
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ post: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to create post' }, { status: 500 });
  }
}
