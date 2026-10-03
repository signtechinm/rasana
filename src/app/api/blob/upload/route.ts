import { getPayload } from "payload";
import config from "@/payload.config";
import { uploadPublicBlob } from "@/lib/blob";

const allowedFolders = new Set(["home-hero", "partner-logos", "product-images"]);

export async function POST(request: Request) {
  const payload = await getPayload({ config });
  const auth = await payload.auth({ headers: request.headers });
  if (!auth.user) return Response.json({ error: "Authentication required." }, { status: 401 });

  const url = new URL(request.url);
  const filename = url.searchParams.get("filename");
  const folder = url.searchParams.get("folder") || "uploads";
  const contentType = request.headers.get("content-type") || "application/octet-stream";
  if (!filename || !allowedFolders.has(folder) || !contentType.startsWith("image/")) {
    return Response.json({ error: "A valid image and upload folder are required." }, { status: 400 });
  }
  if (!request.body) return Response.json({ error: "No file selected." }, { status: 400 });

  const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const blob = await uploadPublicBlob(`${folder}/${Date.now()}-${safeFilename}`, request.body, contentType);
  return Response.json(blob);
}
