'use server'
import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getSignature(): Promise<{
  timestamp: number;
  signature: string;
}> {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "e-learning" },
    (cloudinaryConfig.api_secret || process.env.CLOUDINARY_API_SECRET) as string
  );

  return {
    timestamp,
    signature,
  };
}
