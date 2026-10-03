import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getHomePage, getPartners } from "@/lib/content";

export default async function Home() {
  const [partners, home] = await Promise.all([getPartners(), getHomePage()]);
  const heroStyle = home.homeHeroImageUrl ? {
    backgroundImage: `linear-gradient(90deg,#1f3354 0%,#1f3354dd 34%,#1f335455 66%,#1f335400),url(${JSON.stringify(String(home.homeHeroImageUrl))})`,
  } : undefined;

  return <>
    <SiteHeader />
    <main>
      <section className="hero hero-photo" style={heroStyle}>
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent food and nutrition supply</p>
          <h1>{home.homeHeroTitle}</h1>
          <p className="hero-intro">{home.homeHeroIntro}</p>
          <div className="button-row"><Link className="button" href="/brands">See our brands</Link><Link className="text-link" href="/partner-with-us">Partner with us <span>↗</span></Link></div>
        </div>
      </section>
      <section className="section-pad intro"><p className="eyebrow">Three ways we work</p><div className="intro-grid"><h2>{home.homeIntroTitle}</h2><p>{home.homeIntroBody}</p></div></section>
      <section className="section-pad products"><div className="section-top"><p className="eyebrow">What we supply</p><Link className="text-link" href="/products">See the full range <span>↗</span></Link></div><div className="product-layout"><h2>From pantry staples to registered <em>nutrition.</em></h2><p className="hero-intro">Explore our product range and speak to the team about availability, origin, and certifications.</p></div></section>
      <section className="section-pad dark-section partners-home"><p className="eyebrow gold">Our partners</p><h2>Brands we are proud to <em>represent.</em></h2><div className="product-grid">{partners.slice(0, 3).map((partner) => <Link className="product-tile" href={`/brands/${partner.slug}`} key={partner.slug}>{partner.logoUrl && <img className="partner-logo-home" src={partner.logoUrl} alt={`${partner.title} logo`} />}<span>Brand partner</span><h3>{partner.title}</h3><p>{partner.description}</p><b>Explore partner ↗</b></Link>)}</div></section>
      <section className="section-pad contact"><p className="eyebrow gold">Bringing a brand into MENA?</p><h2>{home.homeCtaTitle}</h2><Link className="contact-link" href="/partner-with-us">Partner with us <span>↗</span></Link></section>
    </main>
    <SiteFooter />
  </>;
}
