import { put } from "@vercel/blob";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function POST(request: Request) {
  const payload = await getPayload({ config });
  const auth = await payload.auth({ headers: request.headers });
  if (!auth.user) return Response.json({ error: "Authentication required." }, { status: 401 });
  const filename = new URL(request.url).searchParams.get("filename");
  const contentType = request.headers.get("content-type") || "application/octet-stream";
  if (!filename || !contentType.startsWith("image/")) return Response.json({ error: "A valid image is required." }, { status: 400 });
  if (!request.body) return Response.json({ error: "No file selected." }, { status: 400 });
  const blob = await put(`partner-logos/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "-")}`, request.body, { access: "public", contentType });
  return Response.json(blob);
}
