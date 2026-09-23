import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: { read: () => true },
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "brand", "status"] },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "category", type: "relationship", relationTo: "product-categories", required: true },
    { name: "brand", type: "text" },
    { name: "description", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "originCountry", type: "text" },
    { name: "packaging", type: "text" },
    { name: "certifications", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "enquiryEnabled", type: "checkbox", defaultValue: true },
    { name: "status", type: "select", required: true, defaultValue: "published", options: [{ label: "Published", value: "published" }, { label: "Draft", value: "draft" }] },
    { name: "displayOrder", type: "number", defaultValue: 0 },
    { name: "shortDescription", type: "textarea" },
    { name: "seo", type: "group", fields: [{ name: "title", type: "text" }, { name: "description", type: "textarea" }] },
  ],
};
