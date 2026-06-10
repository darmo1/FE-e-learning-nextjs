import { apiEndpoints } from "@/constants/endpoints.api";
import { headerAccessTokenCookie } from "../../../utils/headers";

/**
 * Uploads an image through the internal upload route and returns its CDN URL.
 * Forwards the session cookie (the route requires auth) and throws on failure
 * so callers can map the error to an ActionResult.
 */
export async function uploadImage(image: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", image);

  const authHeaders = (await headerAccessTokenCookie()) ?? {};

  const res = await fetch(apiEndpoints.UPLOAD_IMAGE, {
    method: "POST",
    headers: authHeaders,
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Error uploading image");
  }

  const data = await res.json();
  return data?.secure_url ?? "";
}
