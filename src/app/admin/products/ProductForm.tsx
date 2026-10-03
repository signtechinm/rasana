"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ProductFormProps = {
  title: string;
  description: string;
  categories: { id: string; name: string }[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error: string;
  saving: boolean;
  product?: Record<string, unknown>;
};

export function ProductForm({ title, description, categories, onSubmit, error, saving, product = {} }: ProductFormProps) {
  const category = typeof product.category === "object" && product.category ? String((product.category as Record<string, unknown>).id || "") : String(product.category || "");
  const [productImageUrl, setProductImageUrl] = useState(String(product.productImageUrl || ""));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function uploadProductImage(file?: File) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const response = await fetch(`/api/blob/upload?folder=product-images&filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      body: file,
      credentials: "include",
    });
    if (!response.ok) {
      setUploadError("Product image upload failed. Check the image and Blob configuration.");
      setUploading(false);
      return;
    }
    const blob = await response.json();
    setProductImageUrl(blob.url);
    setUploading(false);
  }

  return <main className="cms-page">
    <div className="cms-page-heading"><div><Link className="cms-back-link" href="/admin/products">← Products</Link><h1>{title}</h1><p>{description}</p></div></div>
    <form className="panel cms-form cms-form-wide" onSubmit={onSubmit}>
      <input type="hidden" name="productImageUrl" value={productImageUrl} />
      <div className="cms-form-grid">
        <label>Product name<input name="name" defaultValue={String(product.name || "")} required /></label>
        <label>Slug<input name="slug" defaultValue={String(product.slug || "")} required /></label>
      </div>
      <div className="cms-form-grid">
        <label>Category<select name="category" defaultValue={category} required><option value="">Select category</option>{categories.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
        <label>Brand<input name="brand" defaultValue={String(product.brand || "")} /></label>
      </div>
      <label>Product image
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => uploadProductImage(event.target.files?.[0])} />
        {uploading && <small>Uploading product image…</small>}
        {uploadError && <small className="cms-table-error">{uploadError}</small>}
        {productImageUrl && <img src={productImageUrl} alt="Product preview" style={{ width: "100%", maxHeight: 320, objectFit: "contain", background: "#f4f4f2", borderRadius: 7, marginTop: 8 }} />}
      </label>
      <label>Short description<textarea name="shortDescription" rows={3} defaultValue={String(product.shortDescription || "")} /></label>
      <label>Full description<textarea name="description" rows={7} defaultValue={String(product.description || "")} /></label>
      <div className="cms-form-grid"><label>Origin country<input name="originCountry" defaultValue={String(product.originCountry || "")} /></label><label>Packaging<input name="packaging" defaultValue={String(product.packaging || "")} /></label></div>
      <div className="cms-form-grid"><label>Certifications<input name="certifications" defaultValue={String(product.certifications || "")} /></label><label>Display order<input name="displayOrder" type="number" defaultValue={String(product.displayOrder || 0)} /></label></div>
      <div className="cms-form-grid"><label>Status<select name="status" defaultValue={String(product.status || "draft")}><option value="published">Published</option><option value="draft">Draft</option></select></label><label>SEO title<input name="seoTitle" /></label></div>
      <label>SEO description<textarea name="seoDescription" rows={3} /></label>
      {error && <p className="cms-table-error">{error}</p>}
      <div className="cms-form-actions"><Link className="secondary-button" href="/admin/products">Cancel</Link><button className="primary-button" type="submit" disabled={saving || uploading}>{saving ? "Saving…" : title === "New product" ? "Create product" : "Save changes"}</button></div>
    </form>
  </main>;
}
