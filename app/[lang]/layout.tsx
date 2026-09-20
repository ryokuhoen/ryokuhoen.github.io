import type { Metadata, Viewport } from "next";
import "../globals.css";
import { site } from "@/lib/site";
import { baseFontVars, langFontVars } from "@/lib/fonts";
import { getDict, htmlLang, locales, ogLocale, path, type Locale } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealObserver from "@/components/RevealObserver";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

/** 言語ごとの hreflang（x-default は日本語） */
function languageAlternates(p: string) {
  const out: Record<string, string> = { "x-default": path("ja", p) };
  for (const l of locales) out[htmlLang[l]] = path(l, p);
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const d = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.title, template: d.meta.titleTemplate },
    description: d.meta.description,
    applicationName: site.legalName,
    alternates: { canonical: path(lang), languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      siteName: d.meta.titleShort,
      title: d.meta.titleShort,
      description: d.meta.description,
      url: path(lang),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: d.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.titleShort,
      description: d.meta.description,
      images: ["/og.jpg"],
    },
    // プレビュー段階は検索エンジンに登録させない（公開承認後に NEXT_PUBLIC_ALLOW_INDEX=true）
    robots: { index: site.allowIndex, follow: site.allowIndex },
  };
}

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const d = getDict(lang);
  return (
    <html lang={htmlLang[lang]} className={`${baseFontVars} ${langFontVars[lang] ?? ""}`.trim()}>
      <body data-lang={lang}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }}
        />
        <a className="skip-link" href="#main">
          {d.nav.skip}
        </a>
        <SiteHeader lang={lang} dict={d} />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} dict={d} />
        <RevealObserver />
      </body>
    </html>
  );
}
