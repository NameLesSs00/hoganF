"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ADMIN_NAV_GROUPS } from "./navConfig";

interface AdminSidebarProps {
  isSuperAdmin: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  isSuperAdmin,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-surface">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-5">
        <Link
          href="/admin"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[15px] font-bold text-white">
            H
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-semibold tracking-tight text-foreground">
              Hogan
            </p>
            <p className="text-[11px] text-muted">Admin Dashboard</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-background hover:text-foreground lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="flex-1 space-y-6 overflow-y-auto px-3 py-5"
      >
        {ADMIN_NAV_GROUPS.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.superAdminOnly || isSuperAdmin,
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {group.title}
              </p>
              <ul className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onCloseMobile}
                        className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-background"
                        }`}
                      >
                        {active && (
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-primary"
                          />
                        )}
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            active ? "text-primary" : "text-muted"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/45"
            aria-hidden="true"
          />
          <aside className="relative z-10 h-full w-64 border-r border-border bg-surface shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
