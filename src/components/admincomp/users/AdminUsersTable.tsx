"use client";

import { Pencil, Shield, Trash2, UserCheck, UserX } from "lucide-react";
import type { AdminUserDto } from "@/clientapi/types/adminUsers";
import { Badge } from "@/components/admincomp/ui/Badge";

interface AdminUsersTableProps {
  users: AdminUserDto[];
  currentUserId: string;
  isLoading: boolean;
  togglingId: string | null;
  onEdit: (user: AdminUserDto) => void;
  onDelete: (user: AdminUserDto) => void;
  onToggleActive: (user: AdminUserDto) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function AdminUsersTable({
  users,
  currentUserId,
  isLoading,
  togglingId,
  onEdit,
  onDelete,
  onToggleActive,
}: AdminUsersTableProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-40 animate-pulse rounded bg-background" />
              <div className="h-3 w-56 animate-pulse rounded bg-background" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-background" />
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted">
          <Shield className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[15px] font-medium text-foreground">
          No administrators found
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Try adjusting your search or filter, or add a new administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-border bg-background/60 text-[12px] font-semibold uppercase tracking-wide text-muted">
            <th className="px-5 py-3">Administrator</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Created</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => {
            const fullName =
              [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
              "Unnamed Admin";
            const isSelf = user.id === currentUserId;
            const hasSuperAdminRole = Boolean(
              user.roles?.some((r) => r.toLowerCase() === "superadmin"),
            );
            const isToggling = togglingId === user.id;

            return (
              <tr
                key={user.id}
                className="transition-colors hover:bg-background/40"
              >
                <td className="px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-medium text-foreground">
                        {fullName}
                      </p>
                      {isSelf && (
                        <span className="rounded bg-background px-1.5 py-0.5 text-[11px] font-medium text-muted">
                          You
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[13px] text-muted">
                      {user.email || "—"}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-3.5">
                  <Badge variant={hasSuperAdminRole ? "primary" : "muted"}>
                    {hasSuperAdminRole ? "SuperAdmin" : "Admin"}
                  </Badge>
                </td>

                <td className="px-5 py-3.5">
                  <Badge variant={user.isActive ? "success" : "muted"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>

                <td className="px-5 py-3.5 text-[13px] text-muted">
                  {formatDate(user.createdAt)}
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      disabled={isSelf || isToggling}
                      onClick={() => onToggleActive(user)}
                      title={
                        isSelf
                          ? "You cannot deactivate your own account"
                          : user.isActive
                            ? "Deactivate administrator"
                            : "Activate administrator"
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {user.isActive ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      title="Edit administrator"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      disabled={isSelf}
                      onClick={() => onDelete(user)}
                      title={
                        isSelf
                          ? "You cannot delete your own account"
                          : "Delete administrator"
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
