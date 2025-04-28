
import { getCookie } from "./cookies";


export const AuthorizationHeaders = async () => {
  try{
    const accessToken = await getCookie("access_token");
    if (!accessToken) throw new Error("Access denied");
    return { Authorization: `Bearer ${accessToken}` };
  }catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    return null;
  }
  
};



export const headerAccessTokenCookie = async () => {
  try{
    const accessToken = await getCookie("access_token");
    if (!accessToken) throw new Error("Access denied");
    return { Cookie: `access_token=${accessToken}` };
  }catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    return null;
  }
  
};
