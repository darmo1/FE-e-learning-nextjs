const HOST = process.env.HOST_FRONTEND || "http://localhost:3000";

export const apiEndpoints = {
  UPLOAD_VIDEO: `${HOST}/api/upload-video`,
  UPLOAD_IMAGE: `${HOST}/api/upload-image`,
  COOKIE: `${HOST}/api/cookie`,
};
