// 2026-09-28 ユーザー提供写真の取り込み（_incoming/2026-09-28 → public/images）。
// 工房内の3連写真は継ぎ目（x=476, x=956 の白線）を避けて3枚に切り分ける。
// _incoming はコミットしないため、再実行は元画像がある環境でのみ行う。
import sharp from "sharp";
import path from "node:path";

const IN = path.resolve("_incoming/2026-09-28");
const OUT = path.resolve("public/images");
const jpg = { quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" };

const tri = path.join(IN, "factory-interior-triptych.jpg");
const parts = [
  ["factory-kitchen.jpg", 0, 474],     // オーブンとホイロ
  ["factory-filler.jpg", 478, 954],    // 充填機
  ["factory-airshower.jpg", 958, 1380] // エアシャワー
];
for (const [name, x0, x1] of parts) {
  const r = await sharp(tri).extract({ left: x0, top: 0, width: x1 - x0, height: 642 }).jpeg(jpg).toFile(path.join(OUT, name));
  console.log(name, r.width, r.height);
}
// 外観は原寸のまま（455x373・拡大しない）
let r = await sharp(path.join(IN, "factory-exterior.jpg")).jpeg(jpg).toFile(path.join(OUT, "factory-exterior.jpg"));
console.log("factory-exterior.jpg", r.width, r.height);
// 焙煎機（縦 1500x2000）
r = await sharp(path.join(IN, "roaster-giesen.jpg")).rotate().resize({ width: 1500, height: 2000, fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(path.join(OUT, "stores-umamachi-roaster.jpg"));
console.log("stores-umamachi-roaster.jpg", r.width, r.height);
