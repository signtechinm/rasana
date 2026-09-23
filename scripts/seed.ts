import { getPayload } from "payload";
import config from "../src/payload.config";

async function upsert(payload: any, collection: string, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, overrideAccess: true });
  return existing.docs[0] ? payload.update({ collection, id: existing.docs[0].id, data, overrideAccess: true }) : payload.create({ collection, data, overrideAccess: true });
}

async function main() {
  const payload = await getPayload({ config });
  const categories: Array<[string, string, string, number]> = [["Meat & poultry", "meat-poultry", "Selected proteins for foodservice and retail partners.", 1], ["Seafood", "seafood", "Trusted coastal and ocean harvest selections.", 2], ["Pantry", "pantry", "Essential ingredients with character and consistency.", 3], ["Fresh produce", "fresh-produce", "Seasonal produce chosen for freshness and dependable supply.", 4], ["Ready meals", "ready-meals", "Thoughtful prepared solutions for busy modern kitchens.", 5], ["Sauces", "sauces", "Layered sauces and finishing ingredients for professional kitchens.", 6]];
  for (const [name, slug, description, displayOrder] of categories) await upsert(payload, "product-categories", slug, { name, slug, description, displayOrder, status: "published" });
  const brands: Array<[string, string, string, number]> = [["Origin partners", "origin-partners", "Producers selected for craft, consistency, and point of view.", 1], ["Rasana essentials", "rasana-essentials", "A dependable range built around the everyday needs of food professionals.", 2], ["North & coast", "north-and-coast", "A distinctive collection of coastal flavours and northern pantry staples.", 3], ["Harvest & field", "harvest-and-field", "Seasonal produce and considered ingredients from trusted growers.", 4], ["Kitchen standard", "kitchen-standard", "Reliable foodservice products for chefs, buyers, and growing kitchens.", 5]];
  for (const [name, slug, homeDescription, displayOrder] of brands) await upsert(payload, "brands", slug, { name, slug, homeDescription, fullDescription: homeDescription, featured: true, displayOrder, status: "published" });
  const productData: Array<[string, string, string, string, string, number]> = [
    ["Selected cuts", "selected-cuts", "Meat & poultry", "Carefully sourced proteins for kitchens that care about provenance.", "Global sourcing", 1],
    ["Ocean harvest", "ocean-harvest", "Seafood", "A considered selection from trusted coastal producers.", "Global sourcing", 2],
    ["The pantry edit", "the-pantry-edit", "Pantry", "Essential ingredients with character, consistency, and craft.", "Global sourcing", 3],
    ["Harvest table", "harvest-table", "Fresh produce", "Seasonal produce chosen for freshness, colour, and dependable supply.", "Mediterranean", 4],
    ["Kitchen ready", "kitchen-ready", "Ready meals", "Thoughtful prepared solutions for busy modern kitchens.", "European partners", 5],
    ["Chef's selection", "chefs-selection", "Sauces", "Layered sauces and finishing ingredients that make good food better.", "Global sourcing", 6],
  ];
  for (const [name, slug, categoryName, shortDescription, originCountry, displayOrder] of productData) {
    const category = await payload.find({ collection: "product-categories", where: { name: { equals: categoryName } }, limit: 1, overrideAccess: true });
    const categoryId = category.docs[0]?.id;
    if (categoryId) await upsert(payload, "products", slug, { name, slug, category: categoryId, shortDescription, originCountry, featured: displayOrder <= 3, enquiryEnabled: true, status: "published", displayOrder });
  }
  await upsert(payload, "pages", "home", { title: "Home page", slug: "home", homeHeroTitle: "Food and nutrition brands, supplied across the Emirates and the region.", homeHeroIntro: "Rasana International Trading is an independent supply partner based in Dubai South.", homeIntroTitle: "Food trade with a steadier point of view.", homeIntroBody: "We say what we can deliver, and we deliver what we said.", homeCtaTitle: "Start with an honest assessment." });
  const contact = await payload.find({ collection: "contact-page", limit: 1, overrideAccess: true }); const contactData = { title: "Tell us what you need.", eyebrow: "Get in touch", intro: "Tell us who you are and what you are looking for.", sectionTitle: "One clear conversation is a good place to start.", sectionBody: "Brand owners and buyers can reach the right person through our enquiry form.", location: "Dubai South Free Zone\nUnited Arab Emirates", email: "hello@rasana.com", whatsappUrl: "https://wa.me/971000000000", formHeading: "Send us an enquiry", formIntro: "The more specific, the faster the answer.", successMessage: "Thank you. Your enquiry has reached us.", reasonOptions: [{ label: "Brand partnership" }, { label: "Product enquiry" }, { label: "Something else" }] }; if (contact.docs[0]) await payload.update({ collection: "contact-page", id: contact.docs[0].id, data: contactData, overrideAccess: true }); else await payload.create({ collection: "contact-page", data: contactData, overrideAccess: true });
  await upsert(payload, "news", "from-origin-to-opportunity", { title: "From origin to opportunity", slug: "from-origin-to-opportunity", excerpt: "How considered sourcing creates better possibilities for food businesses.", content: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Rasana connects considered producers with dependable regional supply." }], direction: null, format: "", indent: 0, version: 1 }], direction: null, format: "", indent: 0, version: 1 } }, publishedAt: new Date().toISOString(), status: "published" });
  console.log("Rasana CMS seed complete.");
}
main().catch((error) => { console.error(error); process.exit(1); });
