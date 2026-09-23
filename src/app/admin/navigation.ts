export type AdminNavItem = { icon: string; label: string; href: string; badge?: string; external?: boolean };
export type AdminNavSection = { label: string; items: AdminNavItem[] };

export const adminNavigation: AdminNavSection[] = [
  { label: "Overview", items: [{ icon: "▦", label: "Dashboard", href: "/admin" }] },
  { label: "Catalogue", items: [
    { icon: "▤", label: "Product categories", href: "/admin/product-categories" },
    { icon: "◇", label: "Products", href: "/admin/products", badge: "6" },
    { icon: "▧", label: "Partners", href: "/admin/partners" },
    { icon: "◌", label: "Media library", href: "/admin/media" },
  ] },
  { label: "Content", items: [
    { icon: "⌂", label: "Home page", href: "/admin/home" },
    { icon: "□", label: "Contact page", href: "/admin/contact" },
    { icon: "◫", label: "News", href: "/admin/news" },
  ] },
  { label: "Settings", items: [
    { icon: "⚙", label: "Account settings", href: "/admin/account" },
    { icon: "↗", label: "View website", href: "/", external: true },
  ] },
];

export const adminRoutes = adminNavigation.flatMap((section) => section.items.map((item) => item.href));

export function isAdminRouteActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}
