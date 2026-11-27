"use client";

import Link from "next/link";
import { ArrowLeft, Columns2, Eye, Pencil, Save } from "lucide-react";
import { Button } from "@/components/admincomp/ui/Button";

export type BlogStudioViewMode = "edit" | "split" | "preview";

interface BlogStudioHeaderProps {
  mode: "create" | "edit";
  viewMode: BlogStudioViewMode;
  isPublished: boolean;
  isSaving: boolean;
  onViewModeChange: (next: BlogStudioViewMode) => void;
  onPublishedChange: (next: boolean) => void;
  onSave: () => void;
}

export function BlogStudioHeader({
  mode,
  viewMode,
  isPublished,
  isSaving,
  onViewModeChange,
  onPublishedChange,
  onSave,
}: BlogStudioHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Blogs</span>
        </Link>
        <span className="h-4 w-px bg-border" />
        <h1 className="text-[16px] font-semibold text-foreground">
          {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center rounded-lg border border-border bg-background p-1">
          {(
            [
              { id: "edit", label: "Edit", icon: Pencil },
              { id: "split", label: "Split", icon: Columns2 },
              { id: "preview", label: "Preview", icon: Eye },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onViewModeChange(id)}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[13px] font-medium transition-colors ${
                viewMode === id
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-[13px] font-medium text-foreground">
          <input
            type="checkbox"
            checked={isPublished}
            disabled={isSaving}
            onChange={(e) => onPublishedChange(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          <span>Published</span>
        </label>

        <Button
          type="button"
          variant="primary"
          isLoading={isSaving}
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          <span>{mode === "create" ? "Create Blog" : "Save Changes"}</span>
        </Button>
      </div>
    </div>
  );
}
