import { apiEndpoints } from "@/constants/endpoints.api";
import { useMutation } from "@tanstack/react-query";

export async function urlToFile(url: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  const filename = getFilenameFromUrl(url);
  const mimeType = getMimeTypeFromFilename(filename);
  return new File([blob], filename, { type: mimeType });
}

export function getFilenameFromUrl(url: string): string {
  return url.split("/").pop() || "archivo.jpg";
}

export function getMimeTypeFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream"; // fallback genérico
  }
}

/**
 * Sube el video directo del navegador a Cloudinary con una firma generada en
 * el servidor. No puede pasar por una API route propia: Vercel limita el body
 * de las funciones a ~4.5MB y los videos de las lecciones lo superan.
 */
const uploadVideoClient = async (file: File) => {
  const signRes = await fetch(apiEndpoints.SIGN_UPLOAD, { method: "POST" });
  if (!signRes.ok) throw new Error("Error al firmar la subida del video");
  const { timestamp, signature, apiKey, cloudName, folder } =
    await signRes.json();

  const formData = new FormData();
  formData.set("file", file);
  formData.set("api_key", apiKey);
  formData.set("timestamp", String(timestamp));
  formData.set("signature", signature);
  formData.set("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Error al subir el video");

  const videoData = await res.json();
  return videoData;
};

export const useUploadVideo = () => {
  return useMutation({
    mutationFn: uploadVideoClient,
  });
};
