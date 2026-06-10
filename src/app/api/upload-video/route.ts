import { handleCloudinaryUpload } from "../_lib/cloudinary-upload";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleCloudinaryUpload(req, {
    field: "upload-video",
    options: {
      resource_type: "video",
      folder: "e-learning",
      chunk_size: 20 * 1024 * 1024, // 20 MB
    },
  });
}
