"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import { Button } from "@/components/admincomp/ui/Button";
import { useAdminBlogDetail } from "@/hooks/admin/useAdminBlogs";
import { BlogEditorForm } from "./BlogEditorForm";
import type { BlogStudioViewMode } from "./BlogStudioHeader";

interface BlogEditorWorkspaceProps {
  mode: "create" | "edit";
  blogId?: string;
}

export function BlogEditorWorkspace({
  mode,
  blogId,
}: BlogEditorWorkspaceProps) {
  const searchParams = useSearchParams();
  const initialView: BlogStudioViewMode =
    searchParams.get("view") === "preview" ? "preview" : "split";

  const detailQuery = useAdminBlogDetail(mode === "edit" ? blogId : undefined);

  if (mode === "edit" && detailQuery.isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-xl border border-border bg-surface">
        <div className="flex items-center gap-2.5 text-[14px] text-muted">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span>Loading blog post...</span>
        </div>
      </div>
    );
  }

  if (mode === "edit" && (detailQuery.isError || !detailQuery.data)) {
    return (
      <div className="rounded-xl border border-primary/25 bg-surface p-6 text-center">
        <p className="text-[15px] font-medium text-primary">
          {extractApiErrorMessage(detailQuery.error, "Unable to load blog post.")}
        </p>
        <Link href="/admin/blogs" className="mt-4 inline-block">
          <Button type="button" variant="outline" size="sm">
            Back to Blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <BlogEditorForm
      key={detailQuery.data?.id ?? "create"}
      mode={mode}
      initialBlog={detailQuery.data ?? null}
      initialView={initialView}
    />
  );
}
