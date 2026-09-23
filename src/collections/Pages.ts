import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "excerpt", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "homeHeroTitle", type: "text" },
    { name: "homeHeroIntro", type: "textarea" },
    { name: "homeIntroTitle", type: "text" },
    { name: "homeIntroBody", type: "textarea" },
    { name: "homeCtaTitle", type: "text" },
    { name: "seo", type: "group", fields: [{ name: "title", type: "text" }, { name: "description", type: "textarea" }] },
  ],
};
