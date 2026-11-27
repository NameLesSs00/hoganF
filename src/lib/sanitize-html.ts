/**
 * Lightweight HTML sanitizer for rendering blog section HTML safely in preview.
 * Preserves semantic formatting, links, lists, blockquotes, and tables while
 * stripping executable scripts, embeds, inline event handlers, and javascript: URLs.
 */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return "";

  return html
    .replace(
      /<\s*(script|iframe|object|embed|style|form|input|button)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,
      "",
    )
    .replace(/<\s*(script|iframe|object|embed|style|meta|link)\b[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}
