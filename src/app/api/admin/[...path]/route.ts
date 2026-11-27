import { NextResponse, type NextRequest } from "next/server";
import { API_BASE_URL } from "@/clientapi/apiConfig";
import { getAdminToken, getRequestLocale } from "@/lib/auth-cookie";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function forwardToBackend(request: NextRequest, context: RouteContext) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { path } = await context.params;
  const targetUrl = `${API_BASE_URL}/api/admin/${path.join("/")}${request.nextUrl.search}`;
  const locale = request.headers.get("accept-language") || (await getRequestLocale());

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept-Language", locale);

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.arrayBuffer() : undefined;

  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  const upstreamContentType = upstream.headers.get("content-type");
  if (upstreamContentType) {
    responseHeaders.set("Content-Type", upstreamContentType);
  }

  if (
    upstream.status === 204 ||
    upstream.status === 205 ||
    upstream.status === 304
  ) {
    return new NextResponse(null, { status: upstream.status });
  }

  const responseBody = await upstream.arrayBuffer();
  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = forwardToBackend;
export const POST = forwardToBackend;
export const PUT = forwardToBackend;
export const PATCH = forwardToBackend;
export const DELETE = forwardToBackend;
