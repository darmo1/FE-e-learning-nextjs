// In the browser a relative URL always targets the current origin (and sends
// cookies); the absolute host is only needed for server-side fetches.
const HOST =
  typeof window !== "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_HOST_FRONTEND ||
      process.env.HOST_FRONTEND ||
      "http://localhost:3000";

export const apiEndpoints = {
  UPLOAD_VIDEO: `${HOST}/api/upload-video`,
  UPLOAD_IMAGE: `${HOST}/api/upload-image`,
  SIGN_UPLOAD: `${HOST}/api/sign-upload`,
  COOKIE: `${HOST}/api/cookie`,
};

export function getApiUrl(path: string) {
  return `${HOST}${path.startsWith("/") ? path : `/${path}`}`;
}
