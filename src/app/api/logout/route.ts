// import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("access_token", "", {
    path: "/",
    expires: new Date(0), // 🧽 Elimina en navegador
  });

  response.cookies.set("refresh_token", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
  // const _cookies = await cookies();
  // _cookies.delete("access_token");
  // _cookies.delete("refresh_token");

  // return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
