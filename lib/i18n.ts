// 対応言語とURLの定義。日本語を含む5言語をそれぞれのパスに分ける（/ja/ /en/ /zh/ /ko/ /es/）。
import type { Dict } from "@/lib/dict/ja";
import { ja } from "@/lib/dict/ja";
import { en } from "@/lib/dict/en";
import { zh } from "@/lib/dict/zh";
import { ko } from "@/lib/dict/ko";
import { es } from "@/lib/dict/es";

export const locales = ["ja", "en", "zh", "ko", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

/** html lang / hreflang に使う正式なタグ。中国語は台湾・香港向けの繁体字。 */
export const htmlLang: Record<Locale, string> = {
  ja: "ja",
  en: "en",
  zh: "zh-Hant",
  ko: "ko",
  es: "es",
};

/** OGP の locale */
export const ogLocale: Record<Locale, string> = {
  ja: "ja_JP",
  en: "en_US",
  zh: "zh_TW",
  ko: "ko_KR",
  es: "es_ES",
};

/** 言語切替メニューの表示名（その言語自身の表記） */
export const localeName: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  zh: "繁體中文",
  ko: "한국어",
  es: "Español",
};

/** 切替ボタンに出す短い表記 */
export const localeShort: Record<Locale, string> = {
  ja: "JA",
  en: "EN",
  zh: "ZH",
  ko: "KO",
  es: "ES",
};

const dicts: Record<Locale, Dict> = { ja, en, zh, ko, es };

export function getDict(lang: Locale): Dict {
  return dicts[lang] ?? ja;
}

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** 言語付きの内部リンクを作る。path は "/" 始まり、または "#id" */
export function path(lang: Locale, to = "/"): string {
  if (to.startsWith("#")) return `/${lang}/${to}`;
  const rest = to === "/" ? "" : to.replace(/^\//, "");
  return `/${lang}/${rest}`;
}

export type { Dict };
