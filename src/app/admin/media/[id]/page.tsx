"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function MediaDetailsPage() {
  const { id } = useParams<{ id: string }>(); const router = useRouter();
  const [media, setMedia] = useState<{ url?: string; alt?: string; caption?: string; credit?: string }>({});
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  useEffect(() => { fetch(`/api/media/${id}`, { credentials: "include" }).then((r) => r.ok ? r.json() : Promise.reject(new Error("Media not found."))).then(setMedia).catch((e: Error) => setError(e.message)).finally(() => setLoading(false)); }, [id]);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); const response = await fetch(`/api/media/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }); if (!response.ok) setError("Could not save media details."); else router.push("/admin/media"); setSaving(false); }
  async function remove() { if (!window.confirm("Delete this media item? Check that it is not used elsewhere first.")) return; const response = await fetch(`/api/media/${id}`, { method: "DELETE", credentials: "include" }); if (!response.ok) { setError("Could not delete this media item."); return; } router.push("/admin/media"); }
  if (loading) return <main className="cms-page"><p className="cms-table-message">Loading media…</p></main>;
  return <main className="cms-page"><div className="cms-page-heading"><div><Link className="cms-back-link" href="/admin/media">← Media library</Link><h1>Media details</h1><p>Update accessibility and attribution information.</p></div></div>{error && <p className="cms-table-error">{error}</p>}<form className="panel cms-form" onSubmit={submit}>{media.url ? <img className="media-detail-image" src={media.url} alt={media.alt || ""} /> : null}<label>Alt text<input name="alt" defaultValue={media.alt || ""} required /></label><label>Caption<input name="caption" defaultValue={media.caption || ""} /></label><label>Credit<input name="credit" defaultValue={media.credit || ""} /></label><div className="cms-form-actions"><button className="danger-button" type="button" onClick={remove}>Delete</button><button className="primary-button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></div></form></main>;
}
