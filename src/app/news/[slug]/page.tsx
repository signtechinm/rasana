import { notFound } from "next/navigation";
import { getCollection } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const article = (await getCollection("news")).find((item) => item.slug === slug); if (!article) notFound(); return <><SiteHeader /><main className="detail-page"><p className="eyebrow">Rasana journal</p><h1>{article.title}</h1><p className="detail-copy">{article.description}</p></main><SiteFooter /></>; }
