const HOST = "https://goproclass.vercel.app" 

export const apiEndpoints = {
  UPLOAD_VIDEO: `${HOST}/api/upload-video`,
  UPLOAD_IMAGE: `${HOST}/api/upload-image`,
  COOKIE: `${HOST}/api/cookie`,
};


export function getApiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_HOST_FRONTEND || "http://localhost:3000";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
