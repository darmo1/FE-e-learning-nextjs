"use server";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { ResponseFetchUser, UserLoginProps } from "./types";
import { setCookies } from "../../../utils/cookies";
import { AuthorizationHeaders } from "../../../utils/headers";
import { userRegisterSchema } from "./schemas";

export const userLogin = async (data: UserLoginProps) => {
  const url = ENDPOINT.LOGIN;
  try {
    const { data: response, cookie } = await requestHandler({
      url,
      method: "POST",
      body: data,
    });

    if (cookie) {
      const [_cookie] = cookie.split(";");
      const [cookieName, cookieValue] = _cookie.split("=");
      await setCookies(cookieName, cookieValue);
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      data: response,
    };
  } catch (error) {
    const errorMessage = parseErrorMessage(error);
    return { success: false, message: errorMessage, data: null };
  }
};

const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    try {
      const parsedError = JSON.parse(error.message);
      if (parsedError && parsedError.message) {
        return parsedError.message;
      }
    } catch (parseError) {
      console.error("Error al parsear el error:", parseError);
    }
    return "Error al iniciar sesión. Inténtalo de nuevo más tarde.";
  }
  return "Ocurrió un error inesperado.";
};

type responseType = {
  success: boolean;
  error: unknown;
  data: unknown;
  message: string;
};
export const userRegisterAction = async (
  _prevState: responseType,
  formData: FormData
) => {
  const url = ENDPOINT.REGISTER;
  const data = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { success, error } = userRegisterSchema.safeParse(data);
  if (!success) {
    return {
      success: false,
      message: "error form",
      error: error.flatten().fieldErrors,
      data: null,
    };
  }
  try {
    const { data: response } = await requestHandler({
      url,
      method: "POST",
      body: {
        full_name: data.fullName,
        email: data.email,
        password: data.password,
      },
    });

    return {
      success: true,
      message: "Registro exitoso, solo falta verificar tu cuenta en tu correo",
      data: response,
      error: null,
    };
  } catch (error) {
    const errorMessage = parseErrorMessage(error);
    return { success: false, message: errorMessage, data: null, error: error };
  }
};

export const fetchUser = async (): Promise<{
  data: ResponseFetchUser;
  response: Response;
}> => {
  const headers = (await AuthorizationHeaders()) || {};
  const response = await requestHandler({
    url: ENDPOINT.USER_INFO,
    headers,
  });

  return response;
};
