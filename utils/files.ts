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

const uploadVideoClient = async (file: File) => {
  const formData = new FormData();
  formData.set("upload-video", file);

  const res = await fetch(apiEndpoints.UPLOAD_VIDEO, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error al subir el video");

  const videoData = await res.json();
  return videoData;
};

export const useUploadVideo = () => {
  return useMutation({
    mutationFn: uploadVideoClient,
  });
};
