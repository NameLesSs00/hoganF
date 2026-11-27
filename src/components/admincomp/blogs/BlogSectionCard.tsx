"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import type { BlogSectionInput } from "@/clientapi/types/adminBlogs";
import { HtmlSectionToolbar } from "./HtmlSectionToolbar";

interface BlogSectionCardProps {
  section: BlogSectionInput;
  index: number;
  total: number;
  disabled: boolean;
  onChange: (updated: BlogSectionInput) => void;
  onMove: (direction: "up" | "down") => void;
  onDelete: () => void;
}

export function BlogSectionCard({
  section,
  index,
  total,
  disabled,
  onChange,
  onMove,
  onDelete,
}: BlogSectionCardProps) {
  const [langTab, setLangTab] = useState<"en" | "ar">("en");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentTitle = langTab === "en" ? section.title.en : section.title.ar;
  const currentHtml =
    langTab === "en" ? section.contentHtml.en : section.contentHtml.ar;

  function updateTitle(value: string) {
    onChange({
      ...section,
      title: { ...section.title, [langTab]: value },
    });
  }

  function updateHtml(value: string) {
    onChange({
      ...section,
      contentHtml: { ...section.contentHtml, [langTab]: value },
    });
  }

  function insertSnippet(snippet: string) {
    const el = textareaRef.current;
    if (!el) {
      updateHtml(`${currentHtml}${snippet}`);
      return;
    }

    const start = el.selectionStart ?? currentHtml.length;
    const end = el.selectionEnd ?? currentHtml.length;
    const nextValue =
      currentHtml.slice(0, start) + snippet + currentHtml.slice(end);
    updateHtml(nextValue);

    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + snippet.length;
      el.setSelectionRange(cursor, cursor);
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background/50 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-foreground px-1.5 text-[12px] font-semibold text-white">
            {index + 1}
          </span>
          <span className="text-[14px] font-semibold text-foreground">
            {section.title.en.trim() || `Section ${index + 1}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Tab */}
          <div className="flex items-center rounded-lg border border-border bg-surface p-0.5">
            {(["en", "ar"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLangTab(lang)}
                className={`rounded-md px-2.5 py-1 text-[12px] font-medium uppercase transition-colors ${
                  langTab === lang
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={index === 0 || disabled}
            onClick={() => onMove("up")}
            title="Move section up"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted hover:text-foreground disabled:opacity-35"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={index === total - 1 || disabled}
            onClick={() => onMove("down")}
            title="Move section down"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted hover:text-foreground disabled:opacity-35"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={onDelete}
            title="Delete section"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-muted hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:opacity-35"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="border-b border-border p-4">
        <label className="mb-1.5 block text-[13px] font-medium text-foreground">
          Section title ({langTab.toUpperCase()})
        </label>
        <input
          type="text"
          dir={langTab === "ar" ? "rtl" : "ltr"}
          disabled={disabled}
          value={currentTitle}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder={
            langTab === "ar"
              ? "عنوان القسم باللغة العربية..."
              : "e.g. Engine Oil & Service Schedule"
          }
          className={`h-10 w-full rounded-lg border border-border bg-surface px-3 text-[14px] text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-60 ${
            langTab === "ar" ? "text-right" : "text-left"
          }`}
        />
      </div>

      {/* Rich HTML Editor */}
      <div>
        <HtmlSectionToolbar
          disabled={disabled}
          onInsertSnippet={insertSnippet}
        />
        <textarea
          ref={textareaRef}
          rows={7}
          dir={langTab === "ar" ? "rtl" : "ltr"}
          disabled={disabled}
          value={currentHtml}
          onChange={(e) => updateHtml(e.target.value)}
          placeholder={
            langTab === "ar"
              ? "اكتب محتوى HTML هنا (فقرات، روابط، جداول)..."
              : "Write HTML content here — supports <p>, <h2>, <a href>, <ul>, <table>..."
          }
          className={`w-full resize-y bg-surface p-3.5 font-mono text-[13px] leading-relaxed text-foreground focus:outline-none disabled:opacity-60 ${
            langTab === "ar" ? "text-right" : "text-left"
          }`}
        />
      </div>
    </div>
  );
}
