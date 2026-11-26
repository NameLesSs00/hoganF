import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-8 shadow-xs">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[13px] font-semibold text-primary">
          404
        </span>
        <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          The page you are looking for does not exist or is currently
          unavailable.
        </p>
        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go to Admin Portal</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
