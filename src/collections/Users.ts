import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  hooks: {
    beforeValidate: [async ({ data, operation, req }) => {
      if (operation === "create") {
        const existing = await req.payload.find({ collection: "users", limit: 1, depth: 0 });
        if (existing.totalDocs > 0) throw new Error("Only one administrator account is permitted.");
      }
      return data;
    }],
  },
  fields: [{ name: "name", type: "text" }],
};
