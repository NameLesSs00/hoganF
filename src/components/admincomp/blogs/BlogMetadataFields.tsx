"use client";

import { Upload, X } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import type { LocalizedString } from "@/clientapi/types/common";
import { Button } from "@/components/admincomp/ui/Button";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

interface BlogMetadataFieldsProps {
  title: LocalizedString;
  summary: LocalizedString;
  heroPreviewSrc: string | null;
  heroFileName: string | null;
  disabled: boolean;
  onTitleChange: (next: LocalizedString) => void;
  onSummaryChange: (next: LocalizedString) => void;
  onHeroSelect: (file: File) => void;
  onHeroClear: () => void;
  onValidationError: (msg: string) => void;
}

export function BlogMetadataFields({
  title,
  summary,
  heroPreviewSrc,
  heroFileName,
  disabled,
  onTitleChange,
  onSummaryChange,
  onHeroSelect,
  onHeroClear,
  onValidationError,
}: BlogMetadataFieldsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onValidationError("Please choose a valid image file (PNG, JPG, WebP).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      onValidationError("Hero image must be 5MB or smaller.");
      return;
    }
    onHeroSelect(file);
  }

  return (
    <div className="space-y-5 rounded-xl border border-border bg-surface p-5">
      <div>
        <h2 className="text-[16px] font-semibold text-foreground">
          Article Details
        </h2>
        <p className="mt-0.5 text-[13px] text-muted">
          Bilingual headline, summary, and hero cover image.
        </p>
      </div>

      {/* Titles */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="blog-title-en"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Title (EN)
          </label>
          <input
            id="blog-title-en"
            type="text"
            disabled={disabled}
            value={title.en}
            onChange={(e) => onTitleChange({ ...title, en: e.target.value })}
            placeholder="e.g. Complete Guide to Hogan 200cc Maintenance"
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="blog-title-ar"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Title (AR)
          </label>
          <input
            id="blog-title-ar"
            type="text"
            dir="rtl"
            disabled={disabled}
            value={title.ar}
            onChange={(e) => onTitleChange({ ...title, ar: e.target.value })}
            placeholder="مثال: الدليل الكامل لصيانة موتوسيكل هوجن"
            className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-right text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="blog-summary-en"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Summary (EN)
          </label>
          <textarea
            id="blog-summary-en"
            rows={3}
            disabled={disabled}
            value={summary.en}
            onChange={(e) =>
              onSummaryChange({ ...summary, en: e.target.value })
            }
            placeholder="Short summary shown on blog cards and article header..."
            className="w-full rounded-lg border border-border bg-surface p-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="blog-summary-ar"
            className="mb-1.5 block text-[13px] font-medium text-foreground"
          >
            Summary (AR)
          </label>
          <textarea
            id="blog-summary-ar"
            rows={3}
            dir="rtl"
            disabled={disabled}
            value={summary.ar}
            onChange={(e) =>
              onSummaryChange({ ...summary, ar: e.target.value })
            }
            placeholder="ملخص قصير يظهر في بطاقة المقال وأعلى الصفحة..."
            className="w-full rounded-lg border border-border bg-surface p-3 text-right text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
          />
        </div>
      </div>

      {/* Hero Image */}
      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-foreground">
          Hero cover image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="rounded-xl border border-dashed border-border bg-background/50 p-4">
          {heroPreviewSrc ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroPreviewSrc}
                  alt="Hero preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-foreground">
                  {heroFileName ?? "Current hero image"}
                </p>
                <p className="mt-0.5 text-[12px] text-muted">
                  Recommended 16:9 landscape (PNG, JPG, WebP up to 5MB)
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Replace</span>
                  </Button>
                  {heroFileName && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={disabled}
                      onClick={() => {
                        onHeroClear();
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Remove new</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center py-5 text-center transition-colors hover:text-primary disabled:opacity-60"
            >
              <Upload className="h-5 w-5 text-muted" />
              <p className="mt-2 text-[13px] font-medium text-foreground">
                Click to upload hero cover image
              </p>
              <p className="mt-0.5 text-[12px] text-muted">
                PNG, JPG, or WebP (max 5MB)
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
