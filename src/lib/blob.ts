import { put } from "@vercel/blob";

export function uploadPublicBlob(pathname: string, body: string | Blob | ArrayBuffer | ReadableStream<Uint8Array>, contentType?: string) {
  return put(pathname, body, {
    access: "public",
    ...(contentType ? { contentType } : {}),
  });
}
