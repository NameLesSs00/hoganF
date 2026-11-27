"use client";

import { ImageIcon, Pencil, Tag, Trash2 } from "lucide-react";
import { resolveMediaUrl } from "@/clientapi/apiConfig";
import type { AdminBrandDto } from "@/clientapi/types/adminBrands";
import { Badge } from "@/components/admincomp/ui/Badge";

interface AdminBrandsTableProps {
  brands: AdminBrandDto[];
  isLoading: boolean;
  onEdit: (brand: AdminBrandDto) => void;
  onDelete: (brand: AdminBrandDto) => void;
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

export function AdminBrandsTable({
  brands,
  isLoading,
  onEdit,
  onDelete,
}: AdminBrandsTableProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-5 py-4">
            <div className="h-16 w-24 animate-pulse rounded-lg bg-background" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-40 animate-pulse rounded bg-background" />
              <div className="h-3 w-28 animate-pulse rounded bg-background" />
            </div>
            <div className="h-6 w-24 animate-pulse rounded-full bg-background" />
          </div>
        ))}
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted">
          <Tag className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[15px] font-medium text-foreground">
          No brands found
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Try adjusting your search or filter, or add your first brand.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-border bg-background/60 text-[12px] font-semibold uppercase tracking-wide text-muted">
            <th className="w-32 px-5 py-3">Logo</th>
            <th className="px-5 py-3">Brand Name (EN / AR)</th>
            <th className="px-5 py-3">Catalog Usage</th>
            <th className="w-36 px-5 py-3">Created</th>
            <th className="w-28 px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {brands.map((brand) => {
            const logoSrc = resolveMediaUrl(brand.logoUrl);

            return (
              <tr
                key={brand.id}
                className="transition-colors hover:bg-background/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface p-2">
                    {logoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoSrc}
                        alt={brand.name?.en || "Brand logo"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-muted" />
                    )}
                  </div>
                </td>

                <td className="px-5 py-3.5">
                  <p className="font-medium text-foreground">
                    {brand.name?.en || "—"}
                  </p>
                  {brand.name?.ar && (
                    <p
                      dir="rtl"
                      className="mt-0.5 text-left text-[13px] text-muted"
                    >
                      {brand.name.ar}
                    </p>
                  )}
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={brand.motorcycleCount > 0 ? "primary" : "muted"}
                    >
                      {brand.motorcycleCount}{" "}
                      {brand.motorcycleCount === 1
                        ? "Motorcycle"
                        : "Motorcycles"}
                    </Badge>
                    <Badge
                      variant={brand.sparePartCount > 0 ? "dark" : "muted"}
                    >
                      {brand.sparePartCount}{" "}
                      {brand.sparePartCount === 1 ? "Spare Part" : "Spare Parts"}
                    </Badge>
                  </div>
                </td>

                <td className="px-5 py-3.5 text-[13px] text-muted">
                  {formatDate(brand.createdAt)}
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(brand)}
                      title="Edit brand"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(brand)}
                      title="Delete brand"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
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
