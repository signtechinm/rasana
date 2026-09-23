import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { News } from "./collections/News";
import { Brands } from "./collections/Brands";
import { Catalogues } from "./collections/Catalogues";
import { BusinessUnits } from "./collections/BusinessUnits";
import { Locations } from "./collections/Locations";
import { SiteSettings } from "./collections/SiteSettings";
import { ProductCategories } from "./collections/ProductCategories";
import { ContactPage } from "./collections/ContactPage";

export default buildConfig({
  admin: { user: Users.slug, meta: { titleSuffix: " — Rasana CMS" } },
  collections: [Users, Media, Pages, ProductCategories, Products, Brands, ContactPage, Catalogues, News, BusinessUnits, Locations, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "development-only-secret-change-me",
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || "postgres://localhost/rasana" } }),
  typescript: { outputFile: "src/payload-types.ts" },
});
