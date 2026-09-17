import type { CollectionConfig } from "payload";
export const Brands: CollectionConfig = { slug: "brands", admin: { useAsTitle: "name" }, fields: [{ name: "name", type: "text", required: true }, { name: "slug", type: "text", required: true, unique: true }, { name: "description", type: "richText" }, { name: "logo", type: "upload", relationTo: "media" }] };
