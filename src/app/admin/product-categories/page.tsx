"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = { id: string; name: string; slug: string; description?: string; displayOrder?: number; status: "published" | "draft" };

export default function ProductCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/product-categories?sort=displayOrder&limit=100", { credentials: "include" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Unable to load categories.")))
      .then((data) => setCategories(data.docs || []))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  return <main className="cms-page"><div className="cms-page-heading"><div><span className="cms-kicker">Catalogue</span><h1>Product categories</h1><p>Organise the products shown across the Rasana catalogue.</p></div><Link className="primary-button" href="/admin/product-categories/new">+ Add category</Link></div>
    <section className="panel cms-table-panel">{loading && <p className="cms-table-message">Loading categories…</p>}{error && <p className="cms-table-message cms-table-error">{error}</p>}{!loading && !error && categories.length === 0 && <p className="cms-table-message">No categories yet. Add the first category to start organising products.</p>}{categories.length > 0 && <div className="cms-data-table"><div className="cms-data-row cms-data-head"><span>Name</span><span>Slug</span><span>Status</span><span>Order</span></div>{categories.map((category) => <Link className="cms-data-row" href={`/admin/product-categories/${category.id}`} key={category.id}><strong>{category.name}</strong><span>{category.slug}</span><span><i className={`cms-status-dot ${category.status}`} />{category.status}</span><span>{category.displayOrder ?? 0}</span></Link>)}</div>}</section>
  </main>;
}
