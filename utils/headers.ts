import { getCookie } from "./cookies";

export const AuthorizationHeaders = async () => {
  const accessToken = await getCookie("access_token");
  if (!accessToken) return null;
  return { Authorization: `Bearer ${accessToken}` };
};

export const headerAccessTokenCookie = async () => {
  const accessToken = await getCookie("access_token");
  if (!accessToken) return null;
  return { Cookie: `access_token=${accessToken}` };
};
