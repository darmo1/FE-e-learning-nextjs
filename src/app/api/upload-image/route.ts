import { handleCloudinaryUpload } from "../_lib/cloudinary-upload";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleCloudinaryUpload(req, {
    field: "image",
    options: {
      resource_type: "image",
      folder: "e-learning",
      use_filename: true,
      unique_filename: false,
    },
  });
}
