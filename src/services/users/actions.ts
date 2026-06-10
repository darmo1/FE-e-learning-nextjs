"use server";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { ResponseFetchUser, UserLoginProps } from "./types";
import { setCookies } from "../../../utils/cookies";
import { userRegisterSchema } from "./schemas";
import { cache } from "react";
import { headerAccessTokenCookie } from "../../../utils/headers";
import { ActionResult, actionFailure, actionSuccess } from "../types";

const GENERIC_LOGIN_ERROR =
  "Error al iniciar sesión. Inténtalo de nuevo más tarde.";

type LoginResponse = {
  success: boolean;
  message?: string;
  access_token?: string;
};

export const loginAction = async (
  credentials: UserLoginProps
): Promise<ActionResult<null>> => {
  try {
    const response = await fetch(ENDPOINT.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    const data: LoginResponse | null = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !data.access_token) {
      return actionFailure(data?.message ?? "Credenciales inválidas");
    }

    await setCookies("access_token", data.access_token);
    return actionSuccess(null, data.message ?? "Inicio de sesión exitoso");
  } catch (error) {
    console.error("Error during login:", error);
    return actionFailure(GENERIC_LOGIN_ERROR, error);
  }
};

type RegisterState = {
  success: boolean;
  error: unknown;
  data: unknown;
  message: string;
};

export const userRegisterAction = async (
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
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
      url: ENDPOINT.REGISTER,
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
    console.error("Error during register:", error);
    const message =
      error instanceof Error ? error.message : "Ocurrió un error inesperado.";
    return { success: false, message, data: null, error: null };
  }
};

export const fetchUser = cache(async () => {
  return requestHandler<ResponseFetchUser>({
    url: ENDPOINT.USER_INFO,
  });
});

const ANONYMOUS_USER = {
  role: "",
  isLogged: false,
  user: null,
};

/**
 * Variant of `fetchUser` that never throws or redirects — used in the root
 * layout where an anonymous visitor is a valid state.
 */
export const safeFetchUser = async () => {
  try {
    const authHeaders = (await headerAccessTokenCookie()) ?? {};

    const response = await fetch(ENDPOINT.USER_INFO, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      credentials: "include",
    });

    if (!response.ok) {
      return { data: ANONYMOUS_USER, response: null };
    }

    const data = await response.json();
    return { data, response };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { data: ANONYMOUS_USER, response: null };
  }
};
