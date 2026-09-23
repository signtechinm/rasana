import { getPayload } from "payload";
import { NextResponse } from "next/server";
import config from "@/payload.config";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const payload = await getPayload({ config });
    const result = await payload.login({
      collection: "users",
      data: { email, password },
      req: request,
    });
    if (!result.token) return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    const response = NextResponse.json({ user: result.user });
    response.cookies.set("payload-token", result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }
}
