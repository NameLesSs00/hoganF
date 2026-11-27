import { redirect } from "next/navigation";
import { AdminUsersManager } from "@/components/admincomp/users/AdminUsersManager";
import {
  getServerAdminProfile,
  isSuperAdmin,
} from "@/lib/admin-server-auth";

export default async function AdministratorsPage() {
  const user = await getServerAdminProfile();

  if (!user) {
    redirect("/api/admin/auth/logout");
  }

  // Strictly block regular Admins from viewing or accessing administrator management.
  if (!isSuperAdmin(user)) {
    redirect("/admin");
  }

  return <AdminUsersManager currentUserId={user.id} />;
}
