import { NextResponse, type NextRequest } from "next/server";
import { API_BASE_URL } from "@/clientapi/apiConfig";
import { clearAdminToken, getAdminToken, getRequestLocale } from "@/lib/auth-cookie";

export async function GET(request: NextRequest) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const locale = request.headers.get("accept-language") || (await getRequestLocale());
  const upstream = await fetch(`${API_BASE_URL}/api/admin/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept-Language": locale,
    },
    cache: "no-store",
  });

  if (upstream.status === 401) {
    await clearAdminToken();
  }

  const data = await upstream.json().catch(() => null);
  return NextResponse.json(data, { status: upstream.status });
}
