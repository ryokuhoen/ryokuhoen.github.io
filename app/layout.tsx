import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealObserver from "@/components/RevealObserver";

const mincho = Shippori_Mincho({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mincho",
});
const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-gothic",
});
const garamond = Cormorant_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

const description =
  "京都・東山、八坂の塔のふもとに本店を構える株式会社 緑歩園。飲食店運営、自社工房でのスイーツ製造・卸、オンラインストアを通じて、京都の食を届けています。";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "株式会社 緑歩園 | 京都・東山 飲食店運営／スイーツ製造・販売",
    template: "%s | 株式会社 緑歩園",
  },
  description,
  applicationName: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.wordmark,
    title: "株式会社 緑歩園",
    description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "夜桜と八坂の塔（京都・東山）" }],
  },
  twitter: { card: "summary_large_image", title: "株式会社 緑歩園", description, images: ["/og.jpg"] },
  // プレビュー段階は検索エンジンに登録させない（公開承認後に NEXT_PUBLIC_ALLOW_INDEX=true）
  robots: { index: site.allowIndex, follow: site.allowIndex },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.nameEn,
  url: site.url,
  logo: `${site.url}/og.jpg`,
  email: site.email,
  telephone: site.tel,
  address: {
    "@type": "PostalAddress",
    postalCode: "605-0827",
    addressRegion: "京都府",
    addressLocality: "京都市東山区",
    streetAddress: "八坂上町368-1",
    addressCountry: "JP",
  },
  sameAs: ["http://www.tsuburano.jp/", "https://umamachicoffee.jp/", "https://tsuburanosweetsfactory.com/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${mincho.variable} ${gothic.variable} ${garamond.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        <a className="skip-link" href="#main">本文へ移動</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
