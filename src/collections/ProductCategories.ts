import type { CollectionConfig } from "payload";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  admin: { useAsTitle: "name", defaultColumns: ["name", "status", "displayOrder"] },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
    { name: "displayOrder", type: "number", defaultValue: 0 },
    { name: "status", type: "select", required: true, defaultValue: "published", options: [{ label: "Published", value: "published" }, { label: "Draft", value: "draft" }] },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
