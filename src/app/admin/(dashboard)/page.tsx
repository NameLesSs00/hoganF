import Link from "next/link";
import { FileText, HelpCircle, ShieldCheck, Tag } from "lucide-react";
import { PageHeader } from "@/components/admincomp/ui/PageHeader";
import {
  getServerAdminProfile,
  isSuperAdmin,
} from "@/lib/admin-server-auth";

export default async function AdminDashboardPage() {
  const user = await getServerAdminProfile();
  const canManageAdmins = isSuperAdmin(user);

  const greetingName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.email ||
    "Administrator";

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${greetingName}`}
        description="Manage Hogan motorcycles, spare parts, content, and platform operations."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/brands"
          className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Tag className="h-5 w-5" />
            </span>
            <span className="text-[12px] font-medium text-muted">Catalog</span>
          </div>
          <h2 className="mt-4 text-[16px] font-semibold text-foreground group-hover:text-primary">
            Brands
          </h2>
          <p className="mt-1 text-[13px] text-muted">
            Manage motorcycle and spare-part brands, names, and logos.
          </p>
        </Link>

        <Link
          href="/admin/blogs"
          className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <span className="text-[12px] font-medium text-muted">Content</span>
          </div>
          <h2 className="mt-4 text-[16px] font-semibold text-foreground group-hover:text-primary">
            Blogs
          </h2>
          <p className="mt-1 text-[13px] text-muted">
            Write, format rich HTML sections, preview, and publish articles.
          </p>
        </Link>

        <Link
          href="/admin/faqs"
          className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <HelpCircle className="h-5 w-5" />
            </span>
            <span className="text-[12px] font-medium text-muted">Content</span>
          </div>
          <h2 className="mt-4 text-[16px] font-semibold text-foreground group-hover:text-primary">
            FAQs
          </h2>
          <p className="mt-1 text-[13px] text-muted">
            Manage bilingual frequently asked questions and display order.
          </p>
        </Link>

        {canManageAdmins && (
          <Link
            href="/admin/administrators"
            className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-[12px] font-medium text-primary">
                SuperAdmin
              </span>
            </div>
            <h2 className="mt-4 text-[16px] font-semibold text-foreground group-hover:text-primary">
              Administrators
            </h2>
            <p className="mt-1 text-[13px] text-muted">
              Create, update, activate, or remove administrator accounts.
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
