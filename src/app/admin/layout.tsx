import { getPayload } from "payload";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import config from "@/payload.config";
import AdminFrame from "./AdminFrame";

async function authFailureReason() {
  const cookieStore = await cookies();
  const localToken = cookieStore.get("rasana-admin-session")?.value;
  if (localToken) {
    try {
      await jwtVerify(localToken, new TextEncoder().encode("development-only-secret-change-me"));
      return null;
    } catch {
      // Ignore stale legacy cookies and continue with Payload authentication.
    }
  }
  const token = cookieStore.get("payload-token")?.value;

  if (!token) return "missing-token";

  try {
    const payload = await getPayload({ config });
    const { payload: claims } = await jwtVerify(
      token,
      new TextEncoder().encode(payload.secret),
    );

    if ((typeof claims.id !== "string" && typeof claims.id !== "number") || claims.collection !== "users") {
      return "invalid-claims";
    }

    await payload.findByID({
      collection: "users",
      id: String(claims.id),
      overrideAccess: false,
      depth: 0,
    });

    return null;
  } catch {
    return "payload-auth-failed";
  }
}

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const failure = await authFailureReason();
  if (failure) {
    redirect(`/login?authDebug=${failure}`);
  }

  return <AdminFrame>{children}</AdminFrame>;
}
