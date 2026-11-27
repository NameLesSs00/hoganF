"use client";

import { Calendar, ImageIcon, Layers } from "lucide-react";
import { useState } from "react";
import type { BlogSectionInput } from "@/clientapi/types/adminBlogs";
import type { LocalizedString } from "@/clientapi/types/common";
import { Badge } from "@/components/admincomp/ui/Badge";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";

interface BlogArticlePreviewProps {
  title: LocalizedString;
  summary: LocalizedString;
  heroImageSrc: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  sections: BlogSectionInput[];
}

export function BlogArticlePreview({
  title,
  summary,
  heroImageSrc,
  isPublished,
  publishedAt,
  sections,
}: BlogArticlePreviewProps) {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const isArabic = lang === "ar";

  const activeTitle =
    (isArabic ? title.ar : title.en).trim() ||
    (isArabic ? "عنوان المقال يظهر هنا" : "Your blog title will appear here");
  const activeSummary =
    (isArabic ? summary.ar : summary.en).trim() ||
    (isArabic
      ? "ملخص قصير للمقال يظهر أسفل العنوان الرئيسي."
      : "A concise article summary will appear below the headline.");

  const dateLabel = new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(publishedAt ? new Date(publishedAt) : new Date());

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
      {/* Preview Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-background/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[12px] font-semibold uppercase tracking-wide text-muted">
            Live Blog Preview
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-0.5">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors ${
              lang === "en"
                ? "bg-foreground text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            English (LTR)
          </button>
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={`rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors ${
              lang === "ar"
                ? "bg-foreground text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            العربية (RTL)
          </button>
        </div>
      </div>

      {/* Actual Blog Article Surface */}
      <article
        dir={isArabic ? "rtl" : "ltr"}
        style={{
          fontFamily: isArabic ? "var(--font-ar)" : "var(--font-en)",
        }}
        className="mx-auto max-w-3xl px-6 py-8 sm:px-10 sm:py-10"
      >
        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted">
          <Badge variant={isPublished ? "primary" : "muted"}>
            {isPublished
              ? isArabic
                ? "منشور"
                : "Published"
              : isArabic
                ? "مسودة"
                : "Draft"}
          </Badge>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dateLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            <span>
              {sections.length}{" "}
              {isArabic
                ? "أقسام"
                : sections.length === 1
                  ? "Section"
                  : "Sections"}
            </span>
          </span>
        </div>

        {/* Title & Summary */}
        <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-tight text-foreground sm:text-[32px]">
          {activeTitle}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {activeSummary}
        </p>

        {/* Hero Image */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background">
          {heroImageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroImageSrc}
              alt={activeTitle}
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[16/9] flex-col items-center justify-center text-muted">
              <ImageIcon className="h-8 w-8 opacity-60" />
              <p className="mt-2 text-[13px]">
                {isArabic
                  ? "الصورة الرئيسية للمقال تظهر هنا"
                  : "Hero cover image will appear here"}
              </p>
            </div>
          )}
        </div>

        {/* Table of Contents (when 2+ sections) */}
        {sections.length >= 2 && (
          <nav
            aria-label="Article sections"
            className="mt-8 rounded-xl border border-border bg-background/60 p-4"
          >
            <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">
              {isArabic ? "محتويات المقال" : "In This Article"}
            </p>
            <ol className="mt-2.5 space-y-1.5 text-[14px]">
              {sections.map((section, idx) => {
                const secTitle =
                  (isArabic ? section.title.ar : section.title.en).trim() ||
                  (isArabic ? `القسم ${idx + 1}` : `Section ${idx + 1}`);
                return (
                  <li key={section.localId}>
                    <a
                      href={`#preview-sec-${idx + 1}`}
                      className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                    >
                      <span className="text-[12px] font-semibold text-primary">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{secTitle}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {/* Rendered Sections */}
        <div className="mt-8 space-y-10">
          {sections.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-10 text-center text-[14px] text-muted">
              {isArabic
                ? "أضف أقسامًا للمقال لعرض المحتوى هنا."
                : "Add blog sections on the editor to preview article content here."}
            </div>
          ) : (
            sections.map((section, idx) => {
              const secTitle =
                (isArabic ? section.title.ar : section.title.en).trim() ||
                (isArabic ? `القسم ${idx + 1}` : `Section ${idx + 1}`);
              const rawHtml = isArabic
                ? section.contentHtml.ar
                : section.contentHtml.en;
              const safeHtml = sanitizeBlogHtml(rawHtml);

              return (
                <section
                  key={section.localId}
                  id={`preview-sec-${idx + 1}`}
                  className="scroll-mt-20 border-t border-border pt-7 first:border-t-0 first:pt-0"
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="h-5 w-1 rounded-full bg-primary" />
                    <h2 className="text-[20px] font-semibold tracking-tight text-foreground">
                      {secTitle}
                    </h2>
                  </div>

                  {safeHtml.trim() ? (
                    <div
                      className="blog-prose overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: safeHtml }}
                    />
                  ) : (
                    <p className="text-[14px] italic text-muted">
                      {isArabic
                        ? "لا يوجد محتوى HTML لهذا القسم بعد."
                        : "No HTML content added to this section yet."}
                    </p>
                  )}
                </section>
              );
            })
          )}
        </div>
      </article>
    </div>
  );
}
