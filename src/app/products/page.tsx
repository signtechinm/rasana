import Link from "next/link";
import { getProducts } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default async function ProductsPage() {
  const products = await getProducts();
  return <><SiteHeader /><main className="products-page">
    <section className="products-hero"><div><p className="eyebrow gold">Food and nutrition</p><h1>Our <em>products.</em></h1><p>From pantry staples to registered supplement lines, supplied to retail, wholesale, food service and pharmacy.</p></div></section>
    <section className="products-content">
      <div className="products-intro"><p className="eyebrow">The range</p><p>Explore a considered range of foodstuff and health and nutrition categories. Product availability, origin and certifications are managed through our enquiry process.</p></div>
      <div className="product-grid">{products.map((product, index) => {
        const style = product.productImageUrl ? { backgroundImage: `url(${JSON.stringify(product.productImageUrl)})` } : undefined;
        return <Link className={`product-tile product-tile-${index % 3}`} style={style} href={`/products/${product.slug}`} key={product.slug}><span>{product.category}</span><h2>{product.name}</h2><p>{product.description}</p><b>View product ↗</b></Link>;
      })}</div>
    </section>
  </main><SiteFooter /></>;
}
