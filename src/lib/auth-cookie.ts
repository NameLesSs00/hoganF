import { cookies } from "next/headers";

export const ADMIN_TOKEN_COOKIE = "hogan_admin_token";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export async function getAdminToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;
}

export async function setAdminToken(token: string, expiresAtUtc?: string) {
  const cookieStore = await cookies();
  const expires = expiresAtUtc ? new Date(expiresAtUtc) : undefined;

  cookieStore.set(ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(expires && !Number.isNaN(expires.getTime()) ? { expires } : {}),
  });
}

export async function clearAdminToken() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_COOKIE);
}

export async function getRequestLocale(): Promise<"en" | "ar"> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "ar" ? "ar" : "en";
}
