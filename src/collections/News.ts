import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  admin: { useAsTitle: "title", defaultColumns: ["title", "publishedAt", "status"] },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "publishedAt", type: "date" },
  ],
};
