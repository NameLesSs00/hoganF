import { NextResponse } from "next/server";
import { clearAdminToken } from "@/lib/auth-cookie";

export async function POST() {
  await clearAdminToken();
  return NextResponse.json({ success: true }, { status: 200 });
}
