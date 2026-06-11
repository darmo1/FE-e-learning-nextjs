"use server";

import { ENDPOINT } from "@/constants/endpoints";

type ForgotPasswordState = {
  data: string;
  error: boolean;
  email?: string;
};

export const forgotPasswordAction = async (
  _: ForgotPasswordState,
  payload: { email: string }
): Promise<ForgotPasswordState> => {
  try {
    const response = await fetch(ENDPOINT.FORGOT_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: payload.email }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: data?.detail ?? "Algo salió mal, inténtalo más tarde",
        error: true,
      };
    }

    return {
      data: data?.message ?? "Correo enviado",
      error: false,
      email: payload.email,
    };
  } catch (error) {
    console.error("Error in forgotPasswordAction:", error);
    return { data: "Algo salió mal, inténtalo más tarde", error: true };
  }
};

type ResetPasswordState = {
  message: string;
  success: boolean;
  done: boolean;
};

export const resetPasswordAction = async (
  _: ResetPasswordState,
  payload: { token: string; newPassword: string }
): Promise<ResetPasswordState> => {
  try {
    const response = await fetch(ENDPOINT.RESET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: payload.token,
        new_password: payload.newPassword,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        message: data?.detail ?? "El enlace no es válido o expiró, solicita uno nuevo",
        success: false,
        done: true,
      };
    }

    return {
      message: data?.message ?? "Contraseña actualizada",
      success: true,
      done: true,
    };
  } catch (error) {
    console.error("Error in resetPasswordAction:", error);
    return {
      message: "Algo salió mal, inténtalo más tarde",
      success: false,
      done: true,
    };
  }
};
