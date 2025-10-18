import { redirect } from "next/navigation";
import { getCurrentPath } from "./get-current-path";
import { headerAccessTokenCookie } from "./headers";

type ResquestHandlerProps = Omit<RequestInit, "body"> & {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  credentials?: string;
  headers?: HeadersInit;
  msgPrefix?: string;
};

export const requestHandler = async ({
  url,
  method = "GET",
  body,
  headers = {},
  credentials = "include",
  ...options
}: ResquestHandlerProps) => {
  let response: Response;
  try {
    const authHeaders = (await headerAccessTokenCookie()) || {};

    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...authHeaders,
        ...(headers || {}),
      },
      credentials,
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    };

    response = await fetch(url, config);
    console.log("Fetch response:", response);

    if (response.status === 401) {
      const currentPath = await getCurrentPath();
      console.log("⚠️ Token vencido. Redirigiendo... 🚨");
      redirect(`/auth/refresh?redirect=${encodeURIComponent(currentPath)}`);
      //  Importante: después del redirect, ¡NO sigas el flujo!
    }

    if (response.ok) {
      let data;

      try {
        data = await response.json();
      } catch (e) {
        console.log(e, "error cookies");
      }
      return { data, response };
    } else {
      let errorData;
      try {
        errorData = await response.json();
      } catch (error) {
        errorData = { message: "something went wrong", error };
      }
      throw new Error(JSON.stringify(errorData));
    }
  } catch (error) {
    throw error;
  }
};
