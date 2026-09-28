// sitemap.xml。5言語 × 各ページを hreflang の相互参照つきで出力する。
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales, htmlLang } from "@/lib/i18n";

export const dynamic = "force-static";

const pages = ["", "sweets/"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap((p) => {
    const languages = Object.fromEntries(
      locales.map((l) => [htmlLang[l], `${site.url}/${l}/${p}`]),
    );
    return locales.map((l) => ({
      url: `${site.url}/${l}/${p}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p === "" ? (l === "ja" ? 1 : 0.8) : 0.6,
      alternates: { languages },
    }));
  });
}
