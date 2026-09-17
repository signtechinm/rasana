import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Rasana International Trading | Food Supplier UAE", template: "%s | Rasana" },
  description: "Independent food and nutrition supply partner in the UAE. We represent international brands and trade foodstuff across the Emirates and the MENA region.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
