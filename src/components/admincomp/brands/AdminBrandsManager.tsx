"use client";

import { AlertCircle, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import type { AdminBrandDto } from "@/clientapi/types/adminBrands";
import { Button } from "@/components/admincomp/ui/Button";
import { ConfirmDialog } from "@/components/admincomp/ui/ConfirmDialog";
import { PageHeader } from "@/components/admincomp/ui/PageHeader";
import {
  useAdminBrands,
  useCreateAdminBrand,
  useDeleteAdminBrand,
  useUpdateAdminBrand,
} from "@/hooks/admin/useAdminBrands";
import { AdminBrandFormDrawer } from "./AdminBrandFormDrawer";
import { AdminBrandsTable } from "./AdminBrandsTable";

type UsageFilter = "all" | "used" | "unused";

export function AdminBrandsManager() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [usageFilter, setUsageFilter] = useState<UsageFilter>("all");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrandDto | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<AdminBrandDto | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const brandsQuery = useAdminBrands({
    ...(debouncedSearch ? { Search: debouncedSearch } : {}),
  });

  const createMutation = useCreateAdminBrand();
  const updateMutation = useUpdateAdminBrand();
  const deleteMutation = useDeleteAdminBrand();

  const filteredBrands = useMemo(() => {
    const list = brandsQuery.data ?? [];
    if (usageFilter === "used") {
      return list.filter(
        (b) => b.motorcycleCount > 0 || b.sparePartCount > 0,
      );
    }
    if (usageFilter === "unused") {
      return list.filter(
        (b) => b.motorcycleCount === 0 && b.sparePartCount === 0,
      );
    }
    return list;
  }, [brandsQuery.data, usageFilter]);

  function openCreateDrawer() {
    createMutation.reset();
    updateMutation.reset();
    setEditingBrand(null);
    setDrawerOpen(true);
  }

  function openEditDrawer(brand: AdminBrandDto) {
    createMutation.reset();
    updateMutation.reset();
    setEditingBrand(brand);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingBrand(null);
  }

  const formServerError = createMutation.error
    ? extractApiErrorMessage(createMutation.error, "Failed to create brand.")
    : updateMutation.error
      ? extractApiErrorMessage(updateMutation.error, "Failed to update brand.")
      : null;

  const deleteWarning =
    deletingBrand &&
    (deletingBrand.motorcycleCount > 0 || deletingBrand.sparePartCount > 0)
      ? ` This brand is currently linked to ${deletingBrand.motorcycleCount} motorcycle(s) and ${deletingBrand.sparePartCount} spare part(s) and may be blocked from deletion.`
      : "";

  return (
    <div>
      <PageHeader
        title="Brands"
        description="Manage motorcycle and spare-part brands, bilingual names, and logos."
        action={
          <Button type="button" variant="primary" onClick={openCreateDrawer}>
            <Plus className="h-4 w-4" />
            <span>Add Brand</span>
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
              placeholder="Search brands..."
              className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-muted md:inline">
              {filteredBrands.length}{" "}
              {filteredBrands.length === 1 ? "Brand" : "Brands"}
            </span>
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1">
              {(["all", "used", "unused"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setUsageFilter(filter)}
                  className={`rounded-md px-3 py-1 text-[13px] font-medium capitalize transition-colors ${
                    usageFilter === filter
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
        {brandsQuery.isError && (
          <div className="m-5 flex items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-[13px] text-primary">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {extractApiErrorMessage(
                  brandsQuery.error,
                  "Unable to load brands.",
                )}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => brandsQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Table */}
        <AdminBrandsTable
          brands={filteredBrands}
          isLoading={brandsQuery.isLoading}
          onEdit={openEditDrawer}
          onDelete={(brand) => setDeletingBrand(brand)}
        />
      </div>

      {/* Create / Edit Right Side Drawer */}
      <AdminBrandFormDrawer
        key={editingBrand?.id ?? (drawerOpen ? "create-open" : "closed")}
        open={drawerOpen}
        editingBrand={editingBrand}
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
        open={Boolean(deletingBrand)}
        onClose={() => setDeletingBrand(null)}
        title="Delete Brand"
        description={`Are you sure you want to delete "${
          deletingBrand?.name?.en ?? "this brand"
        }"?${deleteWarning} This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (!deletingBrand) return;
          deleteMutation.mutate(deletingBrand.id, {
            onSuccess: () => setDeletingBrand(null),
          });
        }}
      />
    </div>
  );
}
