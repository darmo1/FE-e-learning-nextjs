import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import os from "os";
import {
  v2 as cloudinary,
  type UploadApiOptions,
  type UploadApiResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = (
  tempFilePath: string,
  options: UploadApiOptions
): Promise<UploadApiResponse | undefined> =>
  new Promise((resolve, reject) => {
    const uploader =
      options.resource_type === "video"
        ? cloudinary.uploader.upload_large.bind(cloudinary.uploader)
        : cloudinary.uploader.upload.bind(cloudinary.uploader);

    uploader(tempFilePath, options, (error, result) => {
      fs.unlinkSync(tempFilePath);
      if (error) return reject(error);
      resolve(result);
    });
  });

/**
 * Shared handler for media upload routes. Requires an authenticated session
 * and streams the received file to Cloudinary.
 */
export async function handleCloudinaryUpload(
  req: Request,
  { field, options }: { field: string; options: UploadApiOptions }
) {
  const cookieStore = await cookies();
  if (!cookieStore.get("access_token")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get(field);

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = path.join(os.tmpdir(), file.name);
    fs.writeFileSync(tempFilePath, buffer);

    const uploadResult = await uploadToCloudinary(tempFilePath, options);
    return NextResponse.json(uploadResult, { status: 200 });
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
