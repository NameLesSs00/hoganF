import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admincomp/layout/AdminShell";
import {
  getServerAdminProfile,
  isSuperAdmin,
} from "@/lib/admin-server-auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerAdminProfile();

  if (!user) {
    redirect("/api/admin/auth/logout");
  }

  return (
    <AdminShell user={user} isSuperAdmin={isSuperAdmin(user)}>
      {children}
    </AdminShell>
  );
}
