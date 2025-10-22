"use server";
import { ENDPOINT } from "@/constants/endpoints";
import { requestHandler } from "../../../utils/request-handler";
import { ResponseFetchUser, UserLoginProps } from "./types";
import { setCookies } from "../../../utils/cookies";
import { userRegisterSchema } from "./schemas";
import { parse } from "cookie";
import { cache } from "react";
import { headerAccessTokenCookie } from "../../../utils/headers";

export const userLogin = async (data: UserLoginProps) => {
  try {
    const response = await fetch(ENDPOINT.LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (error) {
        errorData = { message: "something went wrong", error };
      }

      throw new Error(JSON.stringify(errorData));
    }

    const cookie = (response.headers as Headers).get("set-cookie");
    if (cookie) {
      const cookiesArray = cookie.split(/,(?=\s*\w+=)/); // separa por coma segura
      const cookiesParsed = cookiesArray.map((cookieStr) =>
        parse(cookieStr.trim())
      );

      // Combina todas las cookies en un solo objeto
      const { access_token = "", refresh_token = "" } = Object.assign(
        {},
        ...cookiesParsed
      );
      await setCookies("access_token", access_token);
      await setCookies("refresh_token", refresh_token);
    }
    const responseData = await response.json();
    return {
      success: true,
      message: "Inicio de sesión exitoso",
      data: responseData,
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

      if (parsedError && parsedError.error) {
        return parsedError.error;
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
    console.log("Parsed error message:", errorMessage); 
    return { success: false, message: errorMessage, data: null, error: error };
  }
};

export const fetchUser = cache(
  async (): Promise<{
    data: ResponseFetchUser;
    response: Response;
  }> => {
    try {
   
      const { data, response } = await requestHandler({
        url: ENDPOINT.USER_INFO,
      });


      return {
        data,
        response: response,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const safeFetchUser = async () => {
  try {
    const authHeaders = (await headerAccessTokenCookie()) || {};

    const response = await fetch(ENDPOINT.USER_INFO, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      credentials: "include",
    });

    if (response.status === 401) {
      console.warn("fetchUserSafe: 401 Unauthorized");
      return {
        data: {
          role: "",
          isLogged: false,
          user: null,
        },
        response: null,
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en fetchUserSafe:", errorData);
      return {
        data: {
          role: "",
          isLogged: false,
          user: null,
        },
        response: null,
      };
    }

    const data = await response.json();
    return { data, response };
  } catch (error) {
    console.error("Error de red o fetchUserSafe general:", error);
    return {
      data: {
        role: "",
        isLogged: false,
        user: null,
      },
      response: null,
    };
  }
}

