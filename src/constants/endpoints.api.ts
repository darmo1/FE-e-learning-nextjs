const HOST = process.env.HOST_FRONTEND || "http://localhost:3000";
const NEXT_HOST_FRONTEND= process.env.NEXT_HOST_FRONTEND 

export const apiEndpoints = {
  UPLOAD_VIDEO: `${NEXT_HOST_FRONTEND}/api/upload-video`,
  UPLOAD_IMAGE: `${HOST}/api/upload-image`,
  COOKIE: `${HOST}/api/cookie`,
};
