-- Blog schema and storage setup for Object Technologies
-- Safe to run multiple times (uses IF NOT EXISTS where supported)

-- 1) Table: blog_posts
create table if not exists public.blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  status text not null default 'draft' check (status in ('draft','published')),
  author text,
  slug text unique,
  excerpt text,
  read_time int2,
  category text default 'General',
  tags text[] null,
  image_url text null,
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Update trigger to maintain updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

-- 3) Helpful indexes
create index if not exists idx_blog_posts_status on public.blog_posts (status);
create index if not exists idx_blog_posts_published_at on public.blog_posts (published_at desc nulls last);
create index if not exists idx_blog_posts_slug on public.blog_posts (slug);

-- 4) Minimal RLS: public read of published posts; admin write
alter table public.blog_posts enable row level security;

-- Policy: allow read for published posts to anon
create policy if not exists blog_posts_read_published
on public.blog_posts
for select
using (status = 'published');

-- Policy: allow full access to authenticated users with matching admin role
-- We expect an `admin_users` table with columns: user_id uuid, role text
create policy if not exists blog_posts_full_admin
on public.blog_posts
for all
using (
  auth.uid() is not null and exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  )
)
with check (
  auth.uid() is not null and exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  )
);

-- 5) Storage bucket for blog images
-- Create bucket if missing
insert into storage.buckets (id, name, public)
select 'blog-images', 'blog-images', true
where not exists (select 1 from storage.buckets where id = 'blog-images');

-- Public read policy on the bucket
create policy if not exists "Public read for blog-images"
on storage.objects for select
using ( bucket_id = 'blog-images' );

-- Admin write policy on the bucket (authenticated admin only)
create policy if not exists "Admin write for blog-images"
on storage.objects for all
using (
  auth.uid() is not null and exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  ) and bucket_id = 'blog-images'
)
with check (
  auth.uid() is not null and exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  ) and bucket_id = 'blog-images'
);

-- 6) Optional: derived slug on insert when null
create or replace function public.slugify_title()
returns trigger as $$
begin
  if (new.slug is null) then
    new.slug := lower(regexp_replace(new.title, '[^a-z0-9\s-]', '', 'g'));
    new.slug := regexp_replace(new.slug, '\\s+', '-', 'g');
    new.slug := regexp_replace(new.slug, '-+', '-', 'g');
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_blog_posts_slugify on public.blog_posts;
create trigger trg_blog_posts_slugify
before insert on public.blog_posts
for each row execute function public.slugify_title();
