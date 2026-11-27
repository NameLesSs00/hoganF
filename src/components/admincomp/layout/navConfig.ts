import {
  Bike,
  FileText,
  FolderTree,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  Tag,
  Tags,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  superAdminOnly?: boolean;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Catalog",
    items: [
      { label: "Motorcycles", href: "/admin/motorcycles", icon: Bike },
      { label: "Brands", href: "/admin/brands", icon: Tag },
      { label: "Motorcycle Types", href: "/admin/motorcycle-types", icon: Tags },
      { label: "Spare Parts", href: "/admin/spare-parts", icon: Wrench },
      {
        label: "Spare Part Categories",
        href: "/admin/spare-part-categories",
        icon: FolderTree,
      },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Blogs", href: "/admin/blogs", icon: FileText },
      { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Administrators",
        href: "/admin/administrators",
        icon: ShieldCheck,
        superAdminOnly: true,
      },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function getAdminPageTitle(pathname: string): string {
  for (const group of ADMIN_NAV_GROUPS) {
    for (const item of group.items) {
      if (item.href === "/admin" && pathname === "/admin") {
        return item.label;
      }
      if (item.href !== "/admin" && pathname.startsWith(item.href)) {
        return item.label;
      }
    }
  }
  return "Admin Dashboard";
}
