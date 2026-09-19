// 元写真（OneDrive内）を読み取り専用で参照し、web用に最適化したコピーを public/images に書き出す。
// 元ファイルは移動・削除・上書きしない。
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "C:/Users/user/OneDrive/Desktop/03_緑歩園";
// ユーザー提供の原画像（チャット添付）はプロジェクト内 assets-src に保存済み
const SRC = path.resolve("assets-src");
const OUT = path.resolve("public/images");

// [出力名, 元ファイル, 長辺px, 用途]
const list = [
  ["hero-01-yasaka-night.jpg", `${ROOT}/本店/20210326-DIR53619.jpg`, 2560, "Hero 01 夜桜と八坂の塔"],
  ["hero-02-noren-garden.jpg", `${SRC}/user-noren-garden.jpg`, 2400, "Hero 02 暖簾と苔庭"],
  ["hero-03-momiji-eaves.jpg", `${SRC}/user-momiji-eaves.jpg`, 2400, "Hero 03 もみじと木の軒"],
  ["hero-04-hassun.jpg", `${ROOT}/本店/IMG_9581.jpg`, 2560, "Hero 04 八寸"],
  ["policy-honten-street.jpg", `${ROOT}/本部/JR京都駅関連/kyoto-tsuburano_shop.jpg`, 2400, "理念 本店と八坂の塔"],
  ["sweets-dorayaki.jpg", `${SRC}/user-dorayaki.jpg`, 2000, "スイーツ 主写真 どら焼き（ユーザー提供）"],
  ["factory-oven.jpg", `${ROOT}/tsuburano-sweets-factory/images/factory-oven.jpg`, 1800, "スイーツ 工場オーブン（タオルなしの版）"],
  ["stores-honten-bento.jpg", `${ROOT}/本部/1T1A2114.JPG`, 2400, "店舗 つぶら乃京都本店"],
  ["stores-shinjuku-interior.jpg", `${ROOT}/新宿御苑/つぶら乃店内➀1.jpeg`, 2000, "店舗 新宿御苑店"],
  ["stores-umamachi-exterior.jpg", `${ROOT}/umamachi-coffee-hp/assets/img/hero-exterior.jpg`, 1800, "店舗 馬町珈琲 外観"],
  ["shop-kyoto-voyage.jpg", `${ROOT}/tsuburano-sweets-factory/images/kyoto-voyage.jpg`, 719, "オンラインストア 京都ヴォヤージュ（原寸のまま）"],
  ["company-matcha.jpg", `${ROOT}/本部/368.JPG`, 2400, "会社概要"],
  ["factory-hero-yawaokoshi.jpg", `${ROOT}/工場/IMG_2140.JPG`, 2560, "/sweets ヒーロー"],
  ["factory-terrine-tray.jpg", `${ROOT}/工場/IMG_1725.JPG`, 2400, "/sweets ギャラリー"],
  ["factory-yawaokoshi-box.jpg", `${ROOT}/工場/IMG_2138.JPG`, 2400, "/sweets ギャラリー"],
  ["factory-gift-box.jpg", `${ROOT}/工場/IMG_1722.JPG`, 2400, "/sweets ギャラリー"],
  ["factory-hoiro.jpg", `${ROOT}/tsuburano-sweets-factory/images/hoiro.jpg`, 1800, "/sweets ギャラリー ホイロ"],
];

fs.mkdirSync(OUT, { recursive: true });
sharp.cache(false);

for (const [name, src, long] of list) {
  if (!fs.existsSync(src)) {
    console.warn("MISSING", src);
    continue;
  }
  const buf = fs.readFileSync(src); // 読み取りのみ
  const img = sharp(buf, { failOn: "none" }).rotate();
  const out = await img
    .resize({ width: long, height: long, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: long <= 800 ? 92 : 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, name));
  console.log(name.padEnd(32), `${out.width}x${out.height}`, `${Math.round(out.size / 1024)}KB`);
}

// OGP 1200x630
await sharp(fs.readFileSync(`${ROOT}/本店/20210326-DIR53619.jpg`))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.resolve("public/og.jpg"));
console.log("og.jpg 1200x630");
