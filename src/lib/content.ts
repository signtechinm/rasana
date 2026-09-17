export type Product = { name: string; slug: string; category: string; description: string; originCountry: string };
const fallbackProducts: Product[] = [
  { name: "Selected cuts", slug: "selected-cuts", category: "Meat & poultry", description: "Carefully sourced proteins for kitchens that care about provenance.", originCountry: "Global sourcing" },
  { name: "Ocean harvest", slug: "ocean-harvest", category: "Seafood", description: "A considered selection from trusted coastal producers.", originCountry: "Global sourcing" },
  { name: "The pantry edit", slug: "the-pantry-edit", category: "Pantry", description: "Essential ingredients with character, consistency, and craft.", originCountry: "Global sourcing" },
  { name: "Harvest table", slug: "harvest-table", category: "Fresh produce", description: "Seasonal produce chosen for freshness, colour, and dependable supply.", originCountry: "Mediterranean" },
  { name: "Kitchen ready", slug: "kitchen-ready", category: "Ready meals", description: "Thoughtful prepared solutions for busy modern kitchens.", originCountry: "European partners" },
  { name: "Chef's selection", slug: "chefs-selection", category: "Sauces", description: "Layered sauces and finishing ingredients that make good food better.", originCountry: "Global sourcing" },
];
export async function getProducts(): Promise<Product[]> { const endpoint = process.env.NEXT_PUBLIC_CMS_URL; if (!endpoint) return fallbackProducts; try { const response = await fetch(`${endpoint}/api/products?limit=100`, { next: { revalidate: 60 } }); if (!response.ok) return fallbackProducts; return (await response.json()).docs as Product[]; } catch { return fallbackProducts; } }
export async function getProduct(slug: string) { return (await getProducts()).find((product) => product.slug === slug); }

export type ContentItem = { name?: string; title: string; slug?: string; description?: string };
const fallbackBrands: ContentItem[] = [
  { title: "Origin partners", slug: "origin-partners", description: "Producers selected for their craft, consistency, and point of view." },
  { title: "Rasana essentials", slug: "rasana-essentials", description: "A dependable range built around the everyday needs of food professionals." },
  { title: "North & coast", slug: "north-and-coast", description: "A distinctive collection of coastal flavours and northern pantry staples." },
];
const fallbackNews: ContentItem[] = [
  { title: "From origin to opportunity", slug: "from-origin-to-opportunity", description: "How considered sourcing creates better possibilities for food businesses." },
  { title: "The Rasana approach to partnership", slug: "the-rasana-approach", description: "Trust, clarity, and long-term thinking at every step." },
];
export async function getCollection(collection: "brands" | "catalogues" | "news"): Promise<ContentItem[]> {
  const fallback = collection === "brands" ? fallbackBrands : collection === "news" ? fallbackNews : [{ title: "Rasana product catalogue", description: "Our current selection of quality food products." }, { title: "Foodservice selection", description: "A practical guide to products for chefs and professional kitchens." }, { title: "Retail collection", description: "Shelf-ready products and ideas for modern retail." }];
  const endpoint = process.env.NEXT_PUBLIC_CMS_URL;
  if (!endpoint) return fallback;
  try { const response = await fetch(`${endpoint}/api/${collection}?limit=100`, { next: { revalidate: 60 } }); if (!response.ok) return fallback; return (await response.json()).docs as ContentItem[]; } catch { return fallback; }
}
