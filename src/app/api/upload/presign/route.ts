import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl, r2PublicUrl } from "@/lib/r2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename, contentType, folder = "uploads" } = await req.json();

  if (!filename || !contentType) {
    return NextResponse.json({ error: "filename and contentType required" }, { status: 400 });
  }

  const ext = filename.split(".").pop()?.toLowerCase() || "bin";
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;

  const presignedUrl = await getPresignedUploadUrl(key, contentType);
  const publicUrl = r2PublicUrl(key);

  return NextResponse.json({ presignedUrl, publicUrl, key });
}

