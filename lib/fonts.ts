// 言語別の書体。日本語・欧文は従来どおり（Shippori Mincho / Zen Kaku Gothic New / Cormorant Garamond）。
// 韓国語・繁体字中国語は日本語フォントに字が無く別書体へ化けるため、それぞれ Noto Serif/Sans を当てる。
// いずれも preload: false。@font-face は unicode-range で分かれるため、そのページで使う字だけが読み込まれる。
import {
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
  Cormorant_Garamond,
  Noto_Serif_KR,
  Noto_Sans_KR,
  Noto_Serif_TC,
  Noto_Sans_TC,
} from "next/font/google";

export const mincho = Shippori_Mincho({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-mincho",
});

export const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-gothic",
});

export const garamond = Cormorant_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

const serifKr = Noto_Serif_KR({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif-ko",
});

const sansKr = Noto_Sans_KR({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-sans-ko",
});

const serifTc = Noto_Serif_TC({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif-zh",
});

const sansTc = Noto_Sans_TC({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-sans-zh",
});

/** 共通（日本語・欧文）の変数クラス */
export const baseFontVars = `${mincho.variable} ${gothic.variable} ${garamond.variable}`;

/** その言語のページにだけ足す変数クラス */
export const langFontVars: Record<string, string> = {
  ko: `${serifKr.variable} ${sansKr.variable}`,
  zh: `${serifTc.variable} ${sansTc.variable}`,
};
