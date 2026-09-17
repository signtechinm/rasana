import { notFound } from "next/navigation";
import { getCollection } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const brand = (await getCollection("brands")).find((item) => item.slug === slug); if (!brand) notFound(); return <><SiteHeader /><main className="detail-page"><p className="eyebrow">Brand partner</p><h1>{brand.title}</h1><p className="detail-copy">{brand.description}</p><a className="contact-link" href="mailto:hello@rasana.com?subject=Brand enquiry">Talk to our team ↗</a></main><SiteFooter /></>; }
