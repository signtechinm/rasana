import Link from "next/link";
import { getCollection } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
export default async function NewsPage() { const news = await getCollection("news"); return <><SiteHeader /><main className="page-shell"><p className="eyebrow">Notes from Rasana</p><h1>Latest <em>news</em></h1><div className="product-grid">{news.map((article) => <Link className="product-tile" href={`/news/${article.slug}`} key={article.slug}><span>Journal</span><h2>{article.title}</h2><p>{article.description}</p><b>Read story ↗</b></Link>)}</div></main><SiteFooter /></>; }
