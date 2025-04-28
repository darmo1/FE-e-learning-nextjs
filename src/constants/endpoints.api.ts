const HOST = process.env.HOST_FRONTEND || "http://localhost:3000";
const NEXT_HOST_FRONTEND= process.env.NEXT_HOST_FRONTEND 

export const apiEndpoints = {
  UPLOAD_VIDEO: `${HOST}/api/upload-video`,
  UPLOAD_IMAGE: `${NEXT_HOST_FRONTEND}/api/upload-image`,
  COOKIE: `${HOST}/api/cookie`,
};
