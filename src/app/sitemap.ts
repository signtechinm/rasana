import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://rasana.com";
  const routes = ["", "/products", "/brands", "/catalogues", "/news", "/#about", "/#business", "/#contact"];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: "monthly", priority: route === "" ? 1 : 0.7 }));
}
