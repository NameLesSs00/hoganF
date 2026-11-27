"use client";

import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Table,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/admincomp/ui/Button";

interface HtmlSectionToolbarProps {
  disabled: boolean;
  onInsertSnippet: (snippet: string) => void;
}

function buildHtmlTable(rows: number, cols: number): string {
  const headers = Array.from({ length: cols }, (_, c) => `      <th>Column ${c + 1}</th>`).join("\n");
  const bodyRows = Array.from({ length: rows }, (_, r) => {
    const cells = Array.from(
      { length: cols },
      (_, c) => `      <td>Row ${r + 1}, Cell ${c + 1}</td>`,
    ).join("\n");
    return `    <tr>\n${cells}\n    </tr>`;
  }).join("\n");

  return `\n<table>\n  <thead>\n    <tr>\n${headers}\n    </tr>\n  </thead>\n  <tbody>\n${bodyRows}\n  </tbody>\n</table>\n`;
}

export function HtmlSectionToolbar({
  disabled,
  onInsertSnippet,
}: HtmlSectionToolbarProps) {
  const [activePopover, setActivePopover] = useState<"link" | "table" | null>(
    null,
  );
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("https://");
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  function handleInsertLink() {
    const url = linkUrl.trim();
    const label = linkText.trim() || url;
    if (!url) return;
    onInsertSnippet(
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`,
    );
    setLinkText("");
    setLinkUrl("https://");
    setActivePopover(null);
  }

  function handleInsertTable() {
    const safeRows = Math.min(10, Math.max(1, tableRows));
    const safeCols = Math.min(6, Math.max(1, tableCols));
    onInsertSnippet(buildHtmlTable(safeRows, safeCols));
    setActivePopover(null);
  }

  const toolBtn =
    "flex h-7 items-center gap-1 rounded-md px-2 text-[12px] font-medium text-muted transition-colors hover:bg-surface hover:text-foreground disabled:opacity-40";

  return (
    <div className="border-b border-border bg-background/60">
      <div className="flex flex-wrap items-center gap-1 px-2.5 py-1.5">
        <button
          type="button"
          disabled={disabled}
          title="Heading 2"
          onClick={() => onInsertSnippet("<h2>Heading</h2>\n")}
          className={toolBtn}
        >
          <Heading2 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          title="Heading 3"
          onClick={() => onInsertSnippet("<h3>Subheading</h3>\n")}
          className={toolBtn}
        >
          <Heading3 className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          title="Bold"
          onClick={() => onInsertSnippet("<strong>Bold text</strong>")}
          className={toolBtn}
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          title="Italic"
          onClick={() => onInsertSnippet("<em>Italic text</em>")}
          className={toolBtn}
        >
          <Italic className="h-3.5 w-3.5" />
        </button>

        <span className="mx-1 h-4 w-px bg-border" />

        <button
          type="button"
          disabled={disabled}
          title="Bullet list"
          onClick={() =>
            onInsertSnippet("<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>\n")
          }
          className={toolBtn}
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          title="Numbered list"
          onClick={() =>
            onInsertSnippet("<ol>\n  <li>Step 1</li>\n  <li>Step 2</li>\n</ol>\n")
          }
          className={toolBtn}
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          title="Blockquote"
          onClick={() =>
            onInsertSnippet("<blockquote>Important note or quote</blockquote>\n")
          }
          className={toolBtn}
        >
          <Quote className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          title="Divider"
          onClick={() => onInsertSnippet("\n<hr />\n")}
          className={toolBtn}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <span className="mx-1 h-4 w-px bg-border" />

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            setActivePopover((prev) => (prev === "link" ? null : "link"))
          }
          className={`${toolBtn} ${
            activePopover === "link" ? "bg-surface text-primary" : ""
          }`}
        >
          <Link2 className="h-3.5 w-3.5" />
          <span>Link</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            setActivePopover((prev) => (prev === "table" ? null : "table"))
          }
          className={`${toolBtn} ${
            activePopover === "table" ? "bg-surface text-primary" : ""
          }`}
        >
          <Table className="h-3.5 w-3.5" />
          <span>Table</span>
        </button>
      </div>

      {/* Inline Link Builder */}
      {activePopover === "link" && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-surface px-3 py-2.5">
          <input
            type="text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="Link label"
            className="h-8 flex-1 min-w-[130px] rounded-md border border-border px-2.5 text-[13px] focus:border-primary focus:outline-none"
          />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="h-8 flex-1 min-w-[170px] rounded-md border border-border px-2.5 text-[13px] focus:border-primary focus:outline-none"
          />
          <Button type="button" size="sm" onClick={handleInsertLink}>
            Insert
          </Button>
        </div>
      )}

      {/* Inline Table Builder */}
      {activePopover === "table" && (
        <div className="flex flex-wrap items-center gap-3 border-t border-border bg-surface px-3 py-2.5 text-[13px]">
          <label className="flex items-center gap-1.5 text-muted">
            <span>Rows</span>
            <input
              type="number"
              min={1}
              max={10}
              value={tableRows}
              onChange={(e) => setTableRows(Number(e.target.value))}
              className="h-8 w-16 rounded-md border border-border px-2 text-foreground focus:border-primary focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-1.5 text-muted">
            <span>Columns</span>
            <input
              type="number"
              min={1}
              max={6}
              value={tableCols}
              onChange={(e) => setTableCols(Number(e.target.value))}
              className="h-8 w-16 rounded-md border border-border px-2 text-foreground focus:border-primary focus:outline-none"
            />
          </label>
          <Button type="button" size="sm" onClick={handleInsertTable}>
            Insert Table
          </Button>
        </div>
      )}
    </div>
  );
}
