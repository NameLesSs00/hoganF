import { NextResponse, type NextRequest } from "next/server";
import { clearAdminToken } from "@/lib/auth-cookie";

export async function POST() {
  await clearAdminToken();
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET(request: NextRequest) {
  await clearAdminToken();
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
