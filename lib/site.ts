// サイト全体で使う確定値。出典: CLAUDE_CODE_HANDOFF.md / WIX_ARCHIVE_content.md
export const site = {
  wordmark: "株式会社　緑歩園", // 全角スペース入り（確定）
  legalName: "株式会社 緑歩園",
  nameEn: "RYOKUHOEN Co., Ltd.",
  capital: "1000万円",
  postal: "〒605-0827",
  address: "京都府京都市東山区八坂上町368-1",
  email: "info@ryokuhoen.co.jp",
  tel: "075-741-8779",
  factoryTel: "072-485-1023",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ryokuhoen.co.jp",
  // 本番公開の承認後に NEXT_PUBLIC_ALLOW_INDEX=true で検索エンジン登録を許可
  allowIndex: process.env.NEXT_PUBLIC_ALLOW_INDEX === "true",
  // info@ の転送（ImprovMX）が動いてから NEXT_PUBLIC_FORM_ENABLED=true で formsubmit.co 送信を有効化
  formEnabled: process.env.NEXT_PUBLIC_FORM_ENABLED === "true",
} as const;

export const links = {
  factory: { href: "https://tsuburanosweetsfactory.com/", label: "tsuburanosweetsfactory.com" },
  tsuburano: { href: "http://www.tsuburano.jp/", label: "tsuburano.jp" },
  umamachi: { href: "https://umamachicoffee.jp/", label: "umamachicoffee.jp" },
  stores: { href: "https://tsuburano.stores.jp/", label: "tsuburano.stores.jp" },
} as const;

export const businessAreas = [
  "飲食店運営",
  "JR京都伊勢丹 だし巻きサンド卸",
  "航空会社ビジネスクラス向けスイーツ卸",
  "百貨店・ホテル OEM",
  "宇治契約農園 お茶卸",
  "自社焙煎コーヒー豆卸",
] as const;
