"use client";

import Link from "next/link";
import {
  Eye,
  FileText,
  Globe,
  GlobeLock,
  ImageIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { resolveMediaUrl } from "@/clientapi/apiConfig";
import type { AdminBlogListItemDto } from "@/clientapi/types/adminBlogs";
import { Badge } from "@/components/admincomp/ui/Badge";

interface AdminBlogsTableProps {
  blogs: AdminBlogListItemDto[];
  isLoading: boolean;
  togglingId: string | null;
  onTogglePublish: (blog: AdminBlogListItemDto) => void;
  onDelete: (blog: AdminBlogListItemDto) => void;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function AdminBlogsTable({
  blogs,
  isLoading,
  togglingId,
  onTogglePublish,
  onDelete,
}: AdminBlogsTableProps) {
  if (isLoading) {
    return (
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-5 py-4">
            <div className="h-16 w-24 animate-pulse rounded-lg bg-background" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-60 animate-pulse rounded bg-background" />
              <div className="h-3 w-44 animate-pulse rounded bg-background" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-background" />
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted">
          <FileText className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[15px] font-medium text-foreground">
          No blogs found
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Try adjusting your search or filter, or write your first blog post.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] border-collapse text-left text-[14px]">
        <thead>
          <tr className="border-b border-border bg-background/60 text-[12px] font-semibold uppercase tracking-wide text-muted">
            <th className="w-32 px-5 py-3">Hero</th>
            <th className="px-5 py-3">Title (EN / AR)</th>
            <th className="w-36 px-5 py-3">Content</th>
            <th className="w-28 px-5 py-3">Status</th>
            <th className="w-32 px-5 py-3">Date</th>
            <th className="w-40 px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {blogs.map((blog) => {
            const heroSrc = resolveMediaUrl(blog.heroImageUrl);
            const isToggling = togglingId === blog.id;

            return (
              <tr
                key={blog.id}
                className="transition-colors hover:bg-background/40"
              >
                <td className="px-5 py-3.5">
                  <div className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-lg border border-border bg-background/60">
                    {heroSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={heroSrc}
                        alt={blog.title?.en || "Blog hero"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-muted" />
                    )}
                  </div>
                </td>

                <td className="max-w-sm px-5 py-3.5">
                  <Link
                    href={`/admin/blogs/${blog.id}`}
                    className="line-clamp-1 font-medium text-foreground hover:text-primary"
                  >
                    {blog.title?.en || "Untitled Blog"}
                  </Link>
                  {blog.title?.ar && (
                    <p
                      dir="rtl"
                      className="mt-0.5 line-clamp-1 text-left text-[13px] text-muted"
                    >
                      {blog.title.ar}
                    </p>
                  )}
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-foreground">
                      {blog.sectionCount}{" "}
                      {blog.sectionCount === 1 ? "section" : "sections"}
                    </span>
                    {blog.pendingReviewCount > 0 && (
                      <span className="text-[12px] font-medium text-primary">
                        {blog.pendingReviewCount} pending{" "}
                        {blog.pendingReviewCount === 1 ? "review" : "reviews"}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-5 py-3.5">
                  <Badge variant={blog.isPublished ? "success" : "muted"}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </Badge>
                </td>

                <td className="px-5 py-3.5 text-[13px] text-muted">
                  {formatDate(blog.publishedAt ?? blog.createdAt)}
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/blogs/${blog.id}?view=preview`}
                      title="Preview blog"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      disabled={isToggling}
                      onClick={() => onTogglePublish(blog)}
                      title={
                        blog.isPublished ? "Unpublish to draft" : "Publish blog"
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {blog.isPublished ? (
                        <GlobeLock className="h-4 w-4" />
                      ) : (
                        <Globe className="h-4 w-4" />
                      )}
                    </button>

                    <Link
                      href={`/admin/blogs/${blog.id}`}
                      title="Edit blog"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-background hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(blog)}
                      title="Delete blog"
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
