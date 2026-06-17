import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'; // Need to install uuid

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${fileExtension}`;

    // In a real app, determine the folder based on context (e.g. cv-media, thumbnails, etc)
    const key = `uploads/${fileName}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }));

    // Construct the public URL. Assuming R2.dev or a custom domain is configured.
    // If you have a custom domain attached to the bucket, replace the base URL.
    const publicUrl = `https://pub-xxxxxx.r2.dev/${key}`; // Replace with actual R2.dev URL or custom domain in JULES_AGENT.md notes

    return NextResponse.json({ url: publicUrl, key: key });

  } catch (error: any) {
    console.error("R2 Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error.message },
      { status: 500 }
    );
  }
}
