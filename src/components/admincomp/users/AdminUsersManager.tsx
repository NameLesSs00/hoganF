"use client";

import { AlertCircle, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import type { AdminUserDto } from "@/clientapi/types/adminUsers";
import { Button } from "@/components/admincomp/ui/Button";
import { ConfirmDialog } from "@/components/admincomp/ui/ConfirmDialog";
import { PageHeader } from "@/components/admincomp/ui/PageHeader";
import { Pagination } from "@/components/admincomp/ui/Pagination";
import {
  useAdminUsers,
  useCreateAdminUser,
  useDeleteAdminUser,
  useToggleAdminUserActive,
  useUpdateAdminUser,
} from "@/hooks/admin/useAdminUsers";
import { AdminUserFormModal } from "./AdminUserFormModal";
import { AdminUsersTable } from "./AdminUsersTable";

type StatusFilter = "all" | "active" | "inactive";
const PAGE_SIZE = 10;

interface AdminUsersManagerProps {
  currentUserId: string;
}

export function AdminUsersManager({ currentUserId }: AdminUsersManagerProps) {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserDto | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUserDto | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const queryParams = {
    ...(debouncedSearch ? { Search: debouncedSearch } : {}),
    ...(statusFilter === "active"
      ? { IsActive: true }
      : statusFilter === "inactive"
        ? { IsActive: false }
        : {}),
    Page: page,
    PageSize: PAGE_SIZE,
  };

  const usersQuery = useAdminUsers(queryParams);
  const createMutation = useCreateAdminUser();
  const updateMutation = useUpdateAdminUser();
  const toggleMutation = useToggleAdminUserActive();
  const deleteMutation = useDeleteAdminUser();

  const items = usersQuery.data?.items ?? [];
  const totalCount = usersQuery.data?.totalCount ?? 0;

  function openCreateModal() {
    createMutation.reset();
    updateMutation.reset();
    setEditingUser(null);
    setFormOpen(true);
  }

  function openEditModal(user: AdminUserDto) {
    createMutation.reset();
    updateMutation.reset();
    setEditingUser(user);
    setFormOpen(true);
  }

  function closeFormModal() {
    setFormOpen(false);
    setEditingUser(null);
  }

  const formServerError = createMutation.error
    ? extractApiErrorMessage(createMutation.error, "Failed to create administrator.")
    : updateMutation.error
      ? extractApiErrorMessage(updateMutation.error, "Failed to update administrator.")
      : null;

  return (
    <div>
      <PageHeader
        title="Administrators"
        description="Manage dashboard administrator accounts, active status, and access."
        action={
          <Button type="button" variant="primary" onClick={openCreateModal}>
            <Plus className="h-4 w-4" />
            <span>Add Administrator</span>
          </Button>
        }
      />

      <div className="rounded-xl border border-border bg-surface">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or email..."
              className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1">
            {(["all", "active", "inactive"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setStatusFilter(filter);
                  setPage(1);
                }}
                className={`rounded-md px-3 py-1 text-[13px] font-medium capitalize transition-colors ${
                  statusFilter === filter
                    ? "bg-surface text-foreground shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {usersQuery.isError && (
          <div className="m-5 flex items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-[13px] text-primary">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {extractApiErrorMessage(
                  usersQuery.error,
                  "Unable to load administrators.",
                )}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => usersQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Table */}
        <AdminUsersTable
          users={items}
          currentUserId={currentUserId}
          isLoading={usersQuery.isLoading}
          togglingId={togglingId}
          onEdit={openEditModal}
          onDelete={(user) => setDeletingUser(user)}
          onToggleActive={(user) => {
            setTogglingId(user.id);
            toggleMutation.mutate(
              { id: user.id, isActive: !user.isActive },
              { onSettled: () => setTogglingId(null) },
            );
          }}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
          isLoading={usersQuery.isFetching}
          onPageChange={setPage}
        />
      </div>

      {/* Create / Edit Modal (key resets form state cleanly per target) */}
      <AdminUserFormModal
        key={editingUser?.id ?? (formOpen ? "create-open" : "closed")}
        open={formOpen}
        editingUser={editingUser}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        serverError={formServerError}
        onClose={closeFormModal}
        onCreate={(payload) => {
          createMutation.mutate(payload, { onSuccess: closeFormModal });
        }}
        onUpdate={(id, payload) => {
          updateMutation.mutate({ id, payload }, { onSuccess: closeFormModal });
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        title="Delete Administrator"
        description={`Are you sure you want to permanently delete ${
          deletingUser?.email ?? "this administrator"
        }? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (!deletingUser) return;
          deleteMutation.mutate(deletingUser.id, {
            onSuccess: () => setDeletingUser(null),
          });
        }}
      />
    </div>
  );
}
