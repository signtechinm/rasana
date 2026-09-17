import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
export async function generateStaticParams() { return (await getProducts()).map(({ slug }) => ({ slug })); }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = await getProduct(slug); if (!product) notFound(); return <><SiteHeader /><main className="detail-page"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="detail-copy">{product.description}</p><p className="detail-meta">Origin: {product.originCountry}</p><a className="contact-link" href="mailto:hello@rasana.com?subject=Product enquiry">Enquire about this product ↗</a></main><SiteFooter /></>; }
