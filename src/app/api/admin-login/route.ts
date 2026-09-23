import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === ("production" as string)) {
    return NextResponse.json({ message: "Use the Payload authentication endpoint." }, { status: 404 });
  }

  const { email, password } = await request.json();
  if (email !== "admin@rasana.com" || password !== "Qwerty@123") {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const secret = new TextEncoder().encode("development-only-secret-change-me");
  const token = await new SignJWT({ id: "local-admin", collection: "users" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  const response = NextResponse.json({ user: { email } });
  response.cookies.set("rasana-admin-session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
