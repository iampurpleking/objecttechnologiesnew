# Changelog

## 2025-09-28 — Blog linkage and build fix

- Fixed build error in `app/blog/page.tsx` caused by nested `export default` and `import` statements inside a function from a bad merge. Rewrote the file as a clean client component with a single top-level export and proper Supabase fetching.
- Public blog listing now fetches from Supabase and only shows `status = 'published'`, ordered by `published_at` desc.
- Admin Blog API improvements:
  - On create (POST), automatically derives and stores `slug`, `excerpt` (first ~180 chars of plain text), and `read_time` (200 wpm estimate). Also accepts optional `category` and `tags`.
  - On update (PATCH), recomputes `slug`, `excerpt`, and `read_time` if `title` or `content` change. Sets `published_at` when status becomes `published`.
- Public blog post page (`/blog/[slug]`) now attempts to load a post by `slug` from Supabase first, falling back to local sample posts if env vars are missing or no record is found.
- Adjusted Next.js 15 dynamic route handler signatures to align with latest `context.params` expectations.
- Resolved admin project form type errors by aligning the form shape with used fields.

### Environment variables

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Supabase schema (expected)

- Table: `blog_posts`
  - id (uuid) PK
  - title (text)
  - content (text)
  - status (text) e.g., 'draft' | 'published'
  - author (text)
  - slug (text, unique)
  - excerpt (text)
  - read_time (int)
  - category (text)
  - tags (text[] or jsonb)
  - published_at (timestamptz)
  - created_at (timestamptz) default now()

### How to test

1. Set env vars above.
2. Start the app and open `/admin` → Blog Management. Create a post and set status to "published".
3. Verify it appears on `/blog` and is accessible at `/blog/[slug]`.
