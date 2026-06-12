import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

const UPLOAD_FOLDER = "e-learning";

/**
 * Firma una subida directa del navegador a Cloudinary. Así el archivo no pasa
 * por el servidor de Next (Vercel limita el body a ~4.5MB y los videos de las
 * lecciones lo superan siempre).
 */
export async function POST() {
  const cookieStore = await cookies();
  if (!cookieStore.get("access_token")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    console.error("Cloudinary env vars missing (sign-upload)");
    return NextResponse.json(
      { error: "Cloudinary no está configurado" },
      { status: 500 }
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: UPLOAD_FOLDER },
    apiSecret
  );

  return NextResponse.json({
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder: UPLOAD_FOLDER,
  });
}
