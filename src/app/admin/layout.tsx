import { getPayload } from "payload";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import config from "@/payload.config";
import AdminFrame from "./AdminFrame";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const localToken = cookieStore.get("rasana-admin-session")?.value;
  if (localToken) {
    try {
      await jwtVerify(localToken, new TextEncoder().encode("development-only-secret-change-me"));
      return true;
    } catch {
      // Ignore stale legacy cookies and continue with Payload authentication.
    }
  }
  const token = cookieStore.get("payload-token")?.value;

  if (!token) return false;

  try {
    const payload = await getPayload({ config });
    const { payload: claims } = await jwtVerify(
      token,
      new TextEncoder().encode(payload.secret),
    );

    if (typeof claims.id !== "string" || claims.collection !== "users") {
      return false;
    }

    await payload.findByID({
      collection: "users",
      id: claims.id,
      overrideAccess: false,
      depth: 0,
    });

    return true;
  } catch {
    return false;
  }
}

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return <AdminFrame>{children}</AdminFrame>;
}
