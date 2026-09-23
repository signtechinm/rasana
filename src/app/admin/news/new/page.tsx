"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { NewsForm } from "../NewsForm";
export default function NewNewsPage() { const router = useRouter(); const [saving, setSaving] = useState(false); const [error, setError] = useState(""); async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); const data = Object.fromEntries(new FormData(event.currentTarget)); const r = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ ...data, publishedAt: data.publishedAt || null }) }); if (!r.ok) { setError("Could not save this article."); setSaving(false); return; } router.push("/admin/news"); } return <NewsForm title="New article" description="Create a story or update for the Rasana journal." onSubmit={submit} error={error} saving={saving} />; }
