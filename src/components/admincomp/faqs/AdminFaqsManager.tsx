"use client";

import { AlertCircle, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import type { AdminFaqDto } from "@/clientapi/types/adminFaqs";
import { Button } from "@/components/admincomp/ui/Button";
import { ConfirmDialog } from "@/components/admincomp/ui/ConfirmDialog";
import { PageHeader } from "@/components/admincomp/ui/PageHeader";
import {
  useAdminFaqs,
  useCreateAdminFaq,
  useDeleteAdminFaq,
  useReorderAdminFaqs,
  useToggleAdminFaqActive,
  useUpdateAdminFaq,
} from "@/hooks/admin/useAdminFaqs";
import { AdminFaqFormDrawer } from "./AdminFaqFormDrawer";
import { AdminFaqsTable } from "./AdminFaqsTable";

type StatusFilter = "all" | "active" | "inactive";

export function AdminFaqsManager() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<AdminFaqDto | null>(null);
  const [deletingFaq, setDeletingFaq] = useState<AdminFaqDto | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
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
  };

  const faqsQuery = useAdminFaqs(queryParams);
  const createMutation = useCreateAdminFaq();
  const updateMutation = useUpdateAdminFaq();
  const toggleMutation = useToggleAdminFaqActive();
  const reorderMutation = useReorderAdminFaqs();
  const deleteMutation = useDeleteAdminFaq();

  const sortedFaqs = useMemo(() => {
    const list = faqsQuery.data ?? [];
    return [...list].sort((a, b) => a.orderNumber - b.orderNumber);
  }, [faqsQuery.data]);

  const canReorder = !debouncedSearch && statusFilter === "all";
  const nextOrderNumber =
    sortedFaqs.length > 0
      ? Math.max(...sortedFaqs.map((f) => f.orderNumber)) + 1
      : 1;

  function openCreateDrawer() {
    createMutation.reset();
    updateMutation.reset();
    setEditingFaq(null);
    setDrawerOpen(true);
  }

  function openEditDrawer(faq: AdminFaqDto) {
    createMutation.reset();
    updateMutation.reset();
    setEditingFaq(faq);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingFaq(null);
  }

  function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedFaqs.length) return;

    const reordered = [...sortedFaqs];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    reorderMutation.mutate({
      items: reordered.map((faq, idx) => ({
        id: faq.id,
        orderNumber: idx + 1,
      })),
    });
  }

  const formServerError = createMutation.error
    ? extractApiErrorMessage(createMutation.error, "Failed to create FAQ.")
    : updateMutation.error
      ? extractApiErrorMessage(updateMutation.error, "Failed to update FAQ.")
      : null;

  return (
    <div>
      <PageHeader
        title="FAQs"
        description="Manage bilingual frequently asked questions and their display order."
        action={
          <Button type="button" variant="primary" onClick={openCreateDrawer}>
            <Plus className="h-4 w-4" />
            <span>Add FAQ</span>
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
              placeholder="Search questions or answers..."
              className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-muted md:inline">
              {sortedFaqs.length} {sortedFaqs.length === 1 ? "FAQ" : "FAQs"}
            </span>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1">
              {(["all", "active", "inactive"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
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
        </div>

        {/* Error State */}
        {faqsQuery.isError && (
          <div className="m-5 flex items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-[13px] text-primary">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {extractApiErrorMessage(faqsQuery.error, "Unable to load FAQs.")}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => faqsQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Table */}
        <AdminFaqsTable
          faqs={sortedFaqs}
          isLoading={faqsQuery.isLoading}
          canReorder={canReorder}
          isReordering={reorderMutation.isPending}
          togglingId={togglingId}
          onMove={handleMove}
          onEdit={openEditDrawer}
          onDelete={(faq) => setDeletingFaq(faq)}
          onToggleActive={(faq) => {
            setTogglingId(faq.id);
            toggleMutation.mutate(
              { id: faq.id, isActive: !faq.isActive },
              { onSettled: () => setTogglingId(null) },
            );
          }}
        />
      </div>

      {/* Create / Edit Right Side Drawer */}
      <AdminFaqFormDrawer
        key={editingFaq?.id ?? (drawerOpen ? "create-open" : "closed")}
        open={drawerOpen}
        editingFaq={editingFaq}
        defaultOrderNumber={nextOrderNumber}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        serverError={formServerError}
        onClose={closeDrawer}
        onCreate={(payload) => {
          createMutation.mutate(payload, { onSuccess: closeDrawer });
        }}
        onUpdate={(id, payload) => {
          updateMutation.mutate({ id, payload }, { onSuccess: closeDrawer });
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deletingFaq)}
        onClose={() => setDeletingFaq(null)}
        title="Delete FAQ"
        description={`Are you sure you want to permanently delete "${
          deletingFaq?.question?.en ?? "this FAQ"
        }"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (!deletingFaq) return;
          deleteMutation.mutate(deletingFaq.id, {
            onSuccess: () => setDeletingFaq(null),
          });
        }}
      />
    </div>
  );
}
