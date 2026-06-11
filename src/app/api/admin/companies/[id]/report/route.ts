import { NextRequest, NextResponse } from "next/server";
import { ENDPOINT } from "@/constants/endpoints";
import { getCookie } from "../../../../../../../utils/cookies";

/**
 * Proxy de descarga del informe CSV: el navegador no puede enviar la cookie
 * de sesión directamente al backend (otro dominio), así que este handler la
 * adjunta server-side y reenvía el archivo.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const accessToken = await getCookie("access_token");

  if (!accessToken) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const url = ENDPOINT.COMPANY_REPORT.replace("{0}", id);
  const response = await fetch(url, {
    headers: { Cookie: `access_token=${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "No se pudo generar el informe" },
      { status: response.status }
    );
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        response.headers.get("content-disposition") ??
        `attachment; filename="informe-empresa-${id}.csv"`,
    },
  });
}
