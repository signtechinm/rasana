"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    if (!response.ok) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="login-page">
      <section className="login-art">
        <div className="login-orbit orbit-one" /><div className="login-orbit orbit-two" />
        <div className="login-sun" />
        <div className="login-leaf leaf-a" /><div className="login-leaf leaf-b" />
        <div className="login-art-copy"><span>RASANA</span><strong>Trade with<br /><em>purpose.</em></strong><small>International food trading</small></div>
      </section>
      <section className="login-panel">
        <div className="login-box">
          <div className="login-brand"><span>R</span><div><strong>Rasana CMS</strong><small>International Trading</small></div></div>
          <div className="login-heading"><span>SECURE ACCESS</span><h1>Welcome<br /><em>back.</em></h1><p>Sign in to manage your catalogue and website content.</p></div>
          <form onSubmit={handleSubmit}>
            <label>Email address<input name="email" type="email" defaultValue="admin@rasana.com" placeholder="you@company.com" required autoComplete="email" /></label>
            <label>Password<input name="password" type="password" defaultValue="Qwerty@123" placeholder="Enter your password" required autoComplete="current-password" /></label>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in to CMS"}<span>↗</span></button>
          </form>
          <p className="login-foot">Authorised users only <span>•</span> Rasana International Trading</p>
        </div>
      </section>
    </main>
  );
}
