import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) return NextResponse.json({ error: 'Supabase env missing' }, { status: 500 });

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
    }

    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const supabase = createClient(url, serviceKey);
    const bucket = 'blog-images';
    
    // Check if bucket exists, create if it doesn't
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.id === bucket);
    
    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket(bucket, {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 5242880 // 5MB
      });
      if (bucketError) {
        console.error('Failed to create bucket:', bucketError);
        return NextResponse.json({ error: 'Failed to create storage bucket' }, { status: 500 });
      }
    }
    
    const ext = (file.type && file.type.split('/')[1]) || 'bin';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `uploads/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: upErr } = await supabase.storage.from(bucket).upload(path, arrayBuffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });
    if (upErr) throw upErr;

    const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (e: any) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}
