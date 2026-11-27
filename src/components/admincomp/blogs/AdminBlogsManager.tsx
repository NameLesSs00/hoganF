"use client";

import Link from "next/link";
import { AlertCircle, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import type { AdminBlogListItemDto } from "@/clientapi/types/adminBlogs";
import { Button } from "@/components/admincomp/ui/Button";
import { ConfirmDialog } from "@/components/admincomp/ui/ConfirmDialog";
import { PageHeader } from "@/components/admincomp/ui/PageHeader";
import { Pagination } from "@/components/admincomp/ui/Pagination";
import {
  useAdminBlogs,
  useDeleteAdminBlog,
  useToggleBlogPublish,
} from "@/hooks/admin/useAdminBlogs";
import { AdminBlogsTable } from "./AdminBlogsTable";

type PublishFilter = "all" | "published" | "draft";
const PAGE_SIZE = 10;

export function AdminBlogsManager() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [publishFilter, setPublishFilter] = useState<PublishFilter>("all");
  const [page, setPage] = useState(1);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingBlog, setDeletingBlog] =
    useState<AdminBlogListItemDto | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const blogsQuery = useAdminBlogs({
    ...(debouncedSearch ? { Search: debouncedSearch } : {}),
    ...(publishFilter === "published"
      ? { IsPublished: true }
      : publishFilter === "draft"
        ? { IsPublished: false }
        : {}),
    Page: page,
    PageSize: PAGE_SIZE,
  });

  const togglePublishMutation = useToggleBlogPublish();
  const deleteMutation = useDeleteAdminBlog();

  const items = blogsQuery.data?.items ?? [];
  const totalCount = blogsQuery.data?.totalCount ?? 0;

  return (
    <div>
      <PageHeader
        title="Blogs"
        description="Write, format, preview, and publish bilingual articles for the Hogan website."
        action={
          <Link href="/admin/blogs/new">
            <Button type="button" variant="primary">
              <Plus className="h-4 w-4" />
              <span>New Blog Post</span>
            </Button>
          </Link>
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
              placeholder="Search blog titles..."
              className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background p-1">
            {(["all", "published", "draft"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setPublishFilter(filter);
                  setPage(1);
                }}
                className={`rounded-md px-3 py-1 text-[13px] font-medium capitalize transition-colors ${
                  publishFilter === filter
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
        {blogsQuery.isError && (
          <div className="m-5 flex items-center justify-between gap-3 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-[13px] text-primary">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                {extractApiErrorMessage(
                  blogsQuery.error,
                  "Unable to load blogs.",
                )}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => blogsQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Table */}
        <AdminBlogsTable
          blogs={items}
          isLoading={blogsQuery.isLoading}
          togglingId={togglingId}
          onDelete={(blog) => setDeletingBlog(blog)}
          onTogglePublish={(blog) => {
            setTogglingId(blog.id);
            togglePublishMutation.mutate(
              { id: blog.id, isPublished: !blog.isPublished },
              { onSettled: () => setTogglingId(null) },
            );
          }}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
          isLoading={blogsQuery.isFetching}
          onPageChange={setPage}
        />
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deletingBlog)}
        onClose={() => setDeletingBlog(null)}
        title="Delete Blog Post"
        description={`Are you sure you want to permanently delete "${
          deletingBlog?.title?.en ?? "this blog post"
        }"? All sections and reviews associated with it will be removed.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (!deletingBlog) return;
          deleteMutation.mutate(deletingBlog.id, {
            onSuccess: () => setDeletingBlog(null),
          });
        }}
      />
    </div>
  );
}
