"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation, isAdminRouteActive } from "./navigation";

export default function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The dashboard already owns its original composition; all other CMS pages use this frame.
  if (pathname === "/admin") return children;
  const current = adminNavigation.flatMap((section) => section.items).find((item) => isAdminRouteActive(pathname, item.href));
  const title = current?.label || "Admin";
  return <main className="cms-shell"><aside className="cms-sidebar"><div className="cms-brand"><div className="cms-mark">R</div><div><strong>Rasana CMS</strong><small>International Trading</small></div><span className="cms-year">2026</span></div><nav>{adminNavigation.map((section) => <div className="cms-nav-section" key={section.label}><p>{section.label}</p>{section.items.map((item) => <Link className={isAdminRouteActive(pathname, item.href) ? "active" : ""} href={item.href} key={item.label} target={item.external ? "_blank" : undefined}><i>{item.icon}</i><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</Link>)}</div>)}</nav><div className="cms-user"><div className="avatar">SA</div><div><strong>Super Admin</strong><small>Content manager</small></div><span>⋮</span></div></aside><section className="cms-main"><header className="cms-header"><div className="breadcrumbs"><span>Admin</span><b>/</b><strong>{title}</strong></div><div className="header-actions"><Link href="/">View site</Link><Link href="/admin/account">Account</Link></div></header>{children}</section></main>;
}
