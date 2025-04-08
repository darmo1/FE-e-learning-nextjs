type ResquestHandlerProps = Omit<RequestInit, "body"> & {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  msgPrefix?: string;
  body?: unknown;
  credentials?: string;
};

export const requestHandler = async ({
  url,
  method = "GET",
  headers = {},
  body,
  credentials = "include",
  ...options
}: ResquestHandlerProps) => {
  let response;
  try {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...((headers as Record<string, string>) || {}),
      },
      credentials,
      ...options,
      body: JSON.stringify(body),
    };

    response = await fetch(url, config);

    if (response.ok) {
      let data;
      let setCookie;
      try {
        setCookie = (response.headers as Headers).get("set-cookie");
        data = await response.json();
      } catch (e) {
        console.log(e, "error cookies");
      }
      return { data, cookie: setCookie || '', response };

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
