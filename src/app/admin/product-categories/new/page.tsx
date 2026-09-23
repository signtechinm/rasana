"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductCategoryPage() {
  const router = useRouter(); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); setError(""); const data = Object.fromEntries(new FormData(event.currentTarget)); const response = await fetch("/api/product-categories", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ ...data, displayOrder: Number(data.displayOrder || 0) }) }); if (!response.ok) { setError("Could not save this category. Check the fields and try again."); setSaving(false); return; } router.push("/admin/product-categories"); }
  return <main className="cms-page"><div className="cms-page-heading"><div><Link className="cms-back-link" href="/admin/product-categories">← Product categories</Link><h1>New category</h1><p>Create a category for the product catalogue.</p></div></div><form className="panel cms-form" onSubmit={submit}><label>Name<input name="name" required placeholder="e.g. Seafood" /></label><label>Slug<input name="slug" required placeholder="seafood" /></label><label>Description<textarea name="description" rows={5} placeholder="A short description for this category" /></label><div className="cms-form-grid"><label>Display order<input name="displayOrder" type="number" defaultValue="0" min="0" /></label><label>Status<select name="status" defaultValue="published"><option value="published">Published</option><option value="draft">Draft</option></select></label></div>{error && <p className="cms-table-error">{error}</p>}<div className="cms-form-actions"><Link className="secondary-button" href="/admin/product-categories">Cancel</Link><button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving…" : "Create category"}</button></div></form></main>;
}
