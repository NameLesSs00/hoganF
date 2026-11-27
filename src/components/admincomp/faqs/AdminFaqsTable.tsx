"use client";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  HelpCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import type { AdminFaqDto } from "@/clientapi/types/adminFaqs";
import { Badge } from "@/components/admincomp/ui/Badge";

interface AdminFaqsTableProps {
  faqs: AdminFaqDto[];
  isLoading: boolean;
  canReorder: boolean;
  isReordering: boolean;
  togglingId: string | null;
  onMove: (index: number, direction: "up" | "down") => void;
  onToggleActive: (faq: AdminFaqDto) => void;
  onEdit: (faq: AdminFaqDto) => void;
  onDelete: (faq: AdminFaqDto) => void;
}

export function AdminFaqsTable({
  faqs,
  isLoading,
  canReorder,
  isReordering,
  togglingId,
  onMove,
  onToggleActive,
  onEdit,
  onDelete,
}: AdminFaqsTableProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-5 py-4">
            <div className="h-6 w-10 animate-pulse rounded bg-background" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-64 animate-pulse rounded bg-background" />
              <div className="h-3 w-96 animate-pulse rounded bg-background" />
            </div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-background" />
          </div>
        ))}
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted">
          <HelpCircle className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[15px] font-medium text-foreground">
          No FAQs found
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Try adjusting your search or filter, or create your first FAQ.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[780px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-border bg-background/60 text-[12px] font-semibold uppercase tracking-wide text-muted">
            <th className="w-28 px-5 py-3">Order</th>
            <th className="px-5 py-3">Question (EN / AR)</th>
            <th className="px-5 py-3">Answer Preview</th>
            <th className="w-28 px-5 py-3">Status</th>
            <th className="w-36 px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {faqs.map((faq, index) => {
            const isToggling = togglingId === faq.id;
            const isFirst = index === 0;
            const isLast = index === faqs.length - 1;

            return (
              <tr
                key={faq.id}
                className="transition-colors hover:bg-background/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-border bg-background px-1.5 text-[12px] font-semibold text-foreground">
                      {faq.orderNumber}
                    </span>
                    {canReorder && (
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          disabled={isFirst || isReordering}
                          onClick={() => onMove(index, "up")}
                          title="Move up"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={isLast || isReordering}
                          onClick={() => onMove(index, "down")}
                          title="Move down"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </td>

                <td className="max-w-sm px-5 py-3.5">
                  <p className="line-clamp-1 font-medium text-foreground">
                    {faq.question?.en || "—"}
                  </p>
                  {faq.question?.ar && (
                    <p
                      dir="rtl"
                      className="mt-0.5 line-clamp-1 text-right text-[13px] text-muted"
                    >
                      {faq.question.ar}
                    </p>
                  )}
                </td>

                <td className="max-w-xs px-5 py-3.5">
                  <p className="line-clamp-2 text-[13px] text-muted">
                    {faq.answer?.en || faq.answer?.ar || "—"}
                  </p>
                </td>

                <td className="px-5 py-3.5">
                  <Badge variant={faq.isActive ? "success" : "muted"}>
                    {faq.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      disabled={isToggling}
                      onClick={() => onToggleActive(faq)}
                      title={faq.isActive ? "Deactivate FAQ" : "Activate FAQ"}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {faq.isActive ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(faq)}
                      title="Edit FAQ"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(faq)}
                      title="Delete FAQ"
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
