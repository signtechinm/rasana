import type { CollectionConfig } from "payload";
export const Locations: CollectionConfig = { slug: "locations", admin: { useAsTitle: "name" }, fields: [{ name: "name", type: "text", required: true }, { name: "address", type: "textarea" }, { name: "country", type: "text" }, { name: "email", type: "email" }, { name: "phone", type: "text" }, { name: "mapUrl", type: "text" }] };
