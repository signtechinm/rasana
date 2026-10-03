"use client";

import { FormEvent, useEffect, useState } from "react";

type HomePageRecord = Record<string, string>;

export default function HomeAdminPage() {
  const [page, setPage] = useState<HomePageRecord>({});
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/pages?where[slug][equals]=home&limit=1", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        const record = data.docs?.[0] || {};
        setPage(record);
        setHeroImageUrl(record.homeHeroImageUrl || "");
      })
      .catch(() => setError("Home page content could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  async function uploadHeroImage(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    const response = await fetch(`/api/blob/upload?folder=home-hero&filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      body: file,
      credentials: "include",
    });
    if (!response.ok) {
      setError("Background upload failed. Check the image and Blob configuration.");
      setUploading(false);
      return;
    }
    const blob = await response.json();
    setHeroImageUrl(blob.url);
    setUploading(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const existingId = page.id;
    const response = await fetch(existingId ? `/api/pages/${existingId}` : "/api/pages", {
      method: existingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title: "Home page", slug: "home", ...data }),
    });
    if (!response.ok) setError("Could not save home page content.");
    else {
      setPage(await response.json());
      setMessage("Home page content saved.");
    }
    setSaving(false);
  }

  if (loading) return <main className="cms-page"><p className="cms-table-message">Loading home page…</p></main>;

  return <main className="cms-page">
    <div className="cms-page-heading"><div><span className="cms-kicker">Content</span><h1>Home page</h1><p>Manage the landing image and core copy shown on the public home page.</p></div></div>
    <form className="panel cms-form cms-form-wide" onSubmit={submit}>
      <input type="hidden" name="homeHeroImageUrl" value={heroImageUrl} />
      <label>Landing background image
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => uploadHeroImage(event.target.files?.[0])} />
        {uploading && <small>Uploading background…</small>}
        {heroImageUrl && <img src={heroImageUrl} alt="Landing background preview" style={{ width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 7, marginTop: 8 }} />}
      </label>
      <label>Hero heading<textarea name="homeHeroTitle" rows={3} defaultValue={page.homeHeroTitle || "Food and nutrition brands, supplied across the Emirates and the region."} /></label>
      <label>Hero introduction<textarea name="homeHeroIntro" rows={4} defaultValue={page.homeHeroIntro || "Rasana International Trading is an independent supply partner based in Dubai South. We represent international food and supplement brands in the UAE and MENA markets."} /></label>
      <label>Intro heading<textarea name="homeIntroTitle" rows={2} defaultValue={page.homeIntroTitle || "Food trade with a steadier point of view."} /></label>
      <label>Intro body<textarea name="homeIntroBody" rows={4} defaultValue={page.homeIntroBody || "We say what we can deliver, and we deliver what we said. Supplier vetting, document control, registration and stock cover create dependable supply."} /></label>
      <label>Closing CTA heading<textarea name="homeCtaTitle" rows={2} defaultValue={page.homeCtaTitle || "Start with an honest assessment."} /></label>
      {message && <p className="cms-success">{message}</p>}
      {error && <p className="cms-table-error">{error}</p>}
      <div className="cms-form-actions"><button className="primary-button" type="submit" disabled={saving || uploading}>{saving ? "Saving…" : "Save home page"}</button></div>
    </form>
  </main>;
}
