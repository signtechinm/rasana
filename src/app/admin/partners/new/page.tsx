"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PartnerForm } from "../PartnerForm";

export default function NewPartnerPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...data, featured: data.featured === "on", displayOrder: Number(data.displayOrder || 0) }),
    });
    if (!response.ok) {
      setError("Could not save this partner.");
      setSaving(false);
      return;
    }
    router.push("/admin/partners");
    router.refresh();
  }

  return <PartnerForm title="New partner" description="Add a brand or partner to the Rasana network." onSubmit={submit} error={error} saving={saving} />;
}
