"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resolveMediaUrl } from "@/clientapi/apiConfig";
import { extractApiErrorMessage } from "@/clientapi/admin/auth.api";
import type {
  AdminBlogDetailDto,
  BlogSectionInput,
} from "@/clientapi/types/adminBlogs";
import type { LocalizedString } from "@/clientapi/types/common";
import {
  useCreateAdminBlog,
  useSaveBlogSections,
  useToggleBlogPublish,
  useUpdateAdminBlog,
} from "@/hooks/admin/useAdminBlogs";
import { BlogArticlePreview } from "./BlogArticlePreview";
import { BlogMetadataFields } from "./BlogMetadataFields";
import { BlogSectionsList } from "./BlogSectionsList";
import {
  BlogStudioHeader,
  type BlogStudioViewMode,
} from "./BlogStudioHeader";

function makeEmptySection(orderNumber: number): BlogSectionInput {
  return {
    localId: `sec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: { en: "", ar: "" },
    contentHtml: { en: "", ar: "" },
    orderNumber,
  };
}

interface BlogEditorFormProps {
  mode: "create" | "edit";
  initialBlog: AdminBlogDetailDto | null;
  initialView: BlogStudioViewMode;
}

export function BlogEditorForm({
  mode,
  initialBlog,
  initialView,
}: BlogEditorFormProps) {
  const router = useRouter();
  const createBlog = useCreateAdminBlog();
  const updateBlog = useUpdateAdminBlog();
  const saveSections = useSaveBlogSections();
  const togglePublish = useToggleBlogPublish();

  const [viewMode, setViewMode] = useState<BlogStudioViewMode>(initialView);
  const [title, setTitle] = useState<LocalizedString>(
    initialBlog?.title ?? { en: "", ar: "" },
  );
  const [summary, setSummary] = useState<LocalizedString>(
    initialBlog?.summary ?? { en: "", ar: "" },
  );
  const [isPublished, setIsPublished] = useState(
    initialBlog?.isPublished ?? false,
  );
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroLocalPreview, setHeroLocalPreview] = useState<string | null>(null);
  const [sections, setSections] = useState<BlogSectionInput[]>(() => {
    const existing = initialBlog?.sections ?? [];
    if (existing.length > 0) {
      return [...existing]
        .sort((a, b) => a.orderNumber - b.orderNumber)
        .map((s) => ({
          localId: s.id,
          title: { en: s.title?.en ?? "", ar: s.title?.ar ?? "" },
          contentHtml: {
            en: s.contentHtml?.en ?? "",
            ar: s.contentHtml?.ar ?? "",
          },
          orderNumber: s.orderNumber,
        }));
    }
    return [makeEmptySection(1)];
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (heroLocalPreview) URL.revokeObjectURL(heroLocalPreview);
    };
  }, [heroLocalPreview]);

  const heroPreviewSrc =
    heroLocalPreview ?? resolveMediaUrl(initialBlog?.heroImageUrl);
  const isSaving =
    createBlog.isPending || updateBlog.isPending || saveSections.isPending;

  async function handleSave() {
    setErrorMessage(null);
    if (!title.en.trim() || !title.ar.trim()) {
      setErrorMessage("Both English and Arabic blog titles are required.");
      return;
    }
    if (!summary.en.trim() || !summary.ar.trim()) {
      setErrorMessage("Both English and Arabic blog summaries are required.");
      return;
    }

    const validSections = sections
      .filter(
        (s) =>
          s.title.en.trim() ||
          s.title.ar.trim() ||
          s.contentHtml.en.trim() ||
          s.contentHtml.ar.trim(),
      )
      .map((s, idx) => ({
        title: { en: s.title.en.trim(), ar: s.title.ar.trim() },
        contentHtml: {
          en: s.contentHtml.en.trim(),
          ar: s.contentHtml.ar.trim(),
        },
        orderNumber: idx + 1,
      }));

    try {
      if (mode === "create") {
        const created = await createBlog.mutateAsync({
          titleEn: title.en.trim(),
          titleAr: title.ar.trim(),
          summaryEn: summary.en.trim(),
          summaryAr: summary.ar.trim(),
          heroImage: heroFile,
          isPublished,
        });
        if (validSections.length > 0) {
          await saveSections.mutateAsync({
            id: created.id,
            payload: { sections: validSections },
          });
        }
        toast.success("Blog created successfully.");
        router.replace(`/admin/blogs/${created.id}`);
      } else if (initialBlog) {
        await updateBlog.mutateAsync({
          id: initialBlog.id,
          payload: {
            titleEn: title.en.trim(),
            titleAr: title.ar.trim(),
            summaryEn: summary.en.trim(),
            summaryAr: summary.ar.trim(),
            heroImage: heroFile,
          },
        });
        await saveSections.mutateAsync({
          id: initialBlog.id,
          payload: { sections: validSections },
        });
        if (isPublished !== initialBlog.isPublished) {
          await togglePublish.mutateAsync({ id: initialBlog.id, isPublished });
        }
        toast.success("Blog saved successfully.");
      }
    } catch (error) {
      setErrorMessage(extractApiErrorMessage(error, "Failed to save blog."));
    }
  }

  return (
    <div className="space-y-5">
      <BlogStudioHeader
        mode={mode}
        viewMode={viewMode}
        isPublished={isPublished}
        isSaving={isSaving}
        onViewModeChange={setViewMode}
        onPublishedChange={setIsPublished}
        onSave={handleSave}
      />

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-[13px] text-primary"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div
        className={
          viewMode === "split"
            ? "grid grid-cols-1 items-start gap-6 xl:grid-cols-12"
            : "space-y-6"
        }
      >
        {viewMode !== "preview" && (
          <div
            className={`space-y-5 ${viewMode === "split" ? "xl:col-span-6" : ""}`}
          >
            <BlogMetadataFields
              title={title}
              summary={summary}
              heroPreviewSrc={heroPreviewSrc}
              heroFileName={heroFile?.name ?? null}
              disabled={isSaving}
              onTitleChange={setTitle}
              onSummaryChange={setSummary}
              onValidationError={setErrorMessage}
              onHeroSelect={(file) => {
                if (heroLocalPreview) URL.revokeObjectURL(heroLocalPreview);
                setHeroFile(file);
                setHeroLocalPreview(URL.createObjectURL(file));
              }}
              onHeroClear={() => {
                if (heroLocalPreview) URL.revokeObjectURL(heroLocalPreview);
                setHeroFile(null);
                setHeroLocalPreview(null);
              }}
            />

            <BlogSectionsList
              sections={sections}
              disabled={isSaving}
              onAdd={() =>
                setSections((prev) => [
                  ...prev,
                  makeEmptySection(prev.length + 1),
                ])
              }
              onChange={(idx, updated) =>
                setSections((prev) =>
                  prev.map((item, i) => (i === idx ? updated : item)),
                )
              }
              onMove={(idx, dir) => {
                const target = dir === "up" ? idx - 1 : idx + 1;
                if (target < 0 || target >= sections.length) return;
                setSections((prev) => {
                  const next = [...prev];
                  const [moved] = next.splice(idx, 1);
                  next.splice(target, 0, moved);
                  return next;
                });
              }}
              onDelete={(idx) =>
                setSections((prev) => prev.filter((_, i) => i !== idx))
              }
            />
          </div>
        )}

        {viewMode !== "edit" && (
          <div
            className={
              viewMode === "split" ? "xl:sticky xl:top-20 xl:col-span-6" : ""
            }
          >
            <BlogArticlePreview
              title={title}
              summary={summary}
              heroImageSrc={heroPreviewSrc}
              isPublished={isPublished}
              publishedAt={initialBlog?.publishedAt}
              sections={sections}
            />
          </div>
        )}
      </div>
    </div>
  );
}
