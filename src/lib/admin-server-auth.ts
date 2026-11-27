import { API_BASE_URL } from "@/clientapi/apiConfig";
import type { AdminProfileDto } from "@/clientapi/types/auth";
import { getAdminToken } from "@/lib/auth-cookie";

export function isSuperAdmin(user: AdminProfileDto | null | undefined): boolean {
  return Boolean(
    user?.roles?.some((role) => role.toLowerCase() === "superadmin"),
  );
}

export async function getServerAdminProfile(): Promise<AdminProfileDto | null> {
  const token = await getAdminToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": "en",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return (await response.json()) as AdminProfileDto;
  } catch {
    return null;
  }
}
