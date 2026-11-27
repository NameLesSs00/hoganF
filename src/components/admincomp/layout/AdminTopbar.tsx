"use client";

import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import type { AdminProfileDto } from "@/clientapi/types/auth";
import { Badge } from "@/components/admincomp/ui/Badge";
import { Button } from "@/components/admincomp/ui/Button";
import { useAdminLogout } from "@/hooks/admin/useAdminAuth";
import { getAdminPageTitle } from "./navConfig";

interface AdminTopbarProps {
  user: AdminProfileDto;
  isSuperAdmin: boolean;
  onOpenMobileMenu: () => void;
}

export function AdminTopbar({
  user,
  isSuperAdmin,
  onOpenMobileMenu,
}: AdminTopbarProps) {
  const pathname = usePathname();
  const logoutMutation = useAdminLogout();

  const pageTitle = getAdminPageTitle(pathname);
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.email ||
    "Administrator";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-background lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h2 className="text-[18px] font-semibold tracking-tight text-foreground">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right leading-tight sm:block">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[13px] font-medium text-foreground">
              {fullName}
            </span>
            <Badge variant={isSuperAdmin ? "primary" : "muted"}>
              {isSuperAdmin ? "SuperAdmin" : "Admin"}
            </Badge>
          </div>
          {user.email && (
            <p className="text-[12px] text-muted">{user.email}</p>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          isLoading={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}
