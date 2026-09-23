import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getContactPage } from "@/lib/content";

export const metadata = { title: "Contact Rasana International Trading | Dubai" };
export default async function ContactPage() { const content = await getContactPage(); return <><SiteHeader /><main className="contact-page"><section className="contact-hero"><div><p className="eyebrow gold">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p></div><div className="contact-hero-image" /></section><section className="contact-content"><div className="contact-details"><p className="eyebrow">Contact Rasana</p><h2>{content.sectionTitle}</h2><p>{content.sectionBody}</p><div className="contact-detail-list"><p><span>Location</span>{content.location}</p><p><span>Email</span><a href={`mailto:${content.email}`}>{content.email}</a></p><p><span>WhatsApp</span><a href={content.whatsappUrl}>Message us ↗</a></p></div></div><ContactForm /></section></main><SiteFooter /></>; }
