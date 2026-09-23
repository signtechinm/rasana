import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: { staticDir: "media", adminThumbnail: "thumbnail" },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "text" },
    { name: "credit", type: "text" },
  ],
};
