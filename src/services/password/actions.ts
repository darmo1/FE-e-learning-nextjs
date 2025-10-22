"use server";

import { requestHandler } from "../../../utils/request-handler";

export const forgotPasswordAction = async (
  _: { data: string; error: boolean },
  payload: {
    email: string;
  }
): Promise<{ data: string; error: boolean; email?: string }> => {
  try {
    const { data } = await requestHandler({
      url: "",
      headers: {},
    });

    return {
      data: data ?? "correo enviado",
      error: false,
      email: payload.email,
    };
  } catch {
    return {
      data: "Algo salió mal",
      error: true,
    };
  }
};
