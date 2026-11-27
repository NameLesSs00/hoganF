"use client";

import { useState, type ReactNode } from "react";
import type { AdminProfileDto } from "@/clientapi/types/auth";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

interface AdminShellProps {
  user: AdminProfileDto;
  isSuperAdmin: boolean;
  children: ReactNode;
}

export function AdminShell({ user, isSuperAdmin, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar
        isSuperAdmin={isSuperAdmin}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <AdminTopbar
          user={user}
          isSuperAdmin={isSuperAdmin}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
