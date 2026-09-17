import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  if (typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  if ([body.name, body.email, body.message].some((value: unknown) => typeof value !== "string" || value.length > 5000)) return NextResponse.json({ error: "Enquiry fields are too long." }, { status: 400 });
  // Email/CRM delivery will be connected when the production provider is selected.
  return NextResponse.json({ received: true }, { status: 202 });
}
