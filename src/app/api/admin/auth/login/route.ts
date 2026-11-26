import { NextResponse, type NextRequest } from "next/server";
import { API_BASE_URL } from "@/clientapi/apiConfig";
import { getRequestLocale, setAdminToken } from "@/lib/auth-cookie";

export async function POST(request: NextRequest) {
  const locale = request.headers.get("accept-language") || (await getRequestLocale());
  const body = await request.text();

  const upstream = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": locale,
    },
    body,
    cache: "no-store",
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(data ?? { message: "Login failed" }, {
      status: upstream.status,
    });
  }

  if (data?.accessToken) {
    await setAdminToken(data.accessToken, data.expiresAtUtc);
  }

  return NextResponse.json(
    {
      expiresAtUtc: data?.expiresAtUtc ?? null,
      user: data?.user ?? null,
    },
    { status: 200 },
  );
}
