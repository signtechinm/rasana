import type { CollectionConfig } from "payload";

export const ContactPage: CollectionConfig = {
  slug: "contact-page",
  admin: { useAsTitle: "title", description: "Create one record only. This controls the public contact page." },
  fields: [
    { name: "title", type: "text", required: true, defaultValue: "Tell us what you need." },
    { name: "eyebrow", type: "text", defaultValue: "Get in touch" },
    { name: "intro", type: "textarea" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "sectionTitle", type: "text" },
    { name: "sectionBody", type: "textarea" },
    { name: "location", type: "textarea" },
    { name: "email", type: "email" },
    { name: "whatsappUrl", type: "text" },
    { name: "formHeading", type: "text" },
    { name: "formIntro", type: "textarea" },
    { name: "successMessage", type: "textarea" },
    { name: "reasonOptions", type: "array", fields: [{ name: "label", type: "text", required: true }] },
    { name: "seo", type: "group", fields: [{ name: "title", type: "text" }, { name: "description", type: "textarea" }] },
  ],
};
