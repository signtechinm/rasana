import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
export default function NotFound() { return <><SiteHeader /><main className="detail-page"><p className="eyebrow gold">404</p><h1>Page not <em>found.</em></h1><p className="detail-copy">The page you are looking for may have moved. Let&apos;s get you back to Rasana.</p><Link className="contact-link" href="/">Return home ↗</Link></main><SiteFooter /></>; }
