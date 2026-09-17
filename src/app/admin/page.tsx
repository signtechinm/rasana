import Link from "next/link";

export default function AdminNotice() {
  return <main className="detail-page"><p className="eyebrow gold">Content management</p><h1>CMS access is <em>separate.</em></h1><p className="detail-copy">The Rasana public website is ready for deployment. The Payload administration panel will be hosted separately so its editing dependencies do not affect the public site build.</p><Link className="contact-link" href="/">Return to website ↗</Link></main>;
}
