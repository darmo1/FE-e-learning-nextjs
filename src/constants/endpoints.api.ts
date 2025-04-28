const HOST = process.env.HOST_FRONTEND || process.env.NEXT_PUBLIC_HOST_FRONTEND || "https://goproclass.vercel.app";

export const apiEndpoints = {
  UPLOAD_VIDEO: `${HOST}/api/upload-video`,
  UPLOAD_IMAGE: `${HOST}/api/upload-image`,
  COOKIE: `${HOST}/api/cookie`,
};
