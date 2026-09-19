// 静的書き出し（GitHub Pages）では Next の画像最適化サーバーが使えないため、
// public/images の各画像から幅別の WebP をビルド前に生成する。
// 出力: public/_img/<name>-<width>.webp（lib/image-loader.ts がこの名前を参照する）
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

// next.config.ts の imageSizes + deviceSizes と一致させること
export const WIDTHS = [256, 384, 640, 828, 1080, 1440, 1920, 2560];

const SRC = path.resolve("public/images");
const OUT = path.resolve("public/_img");
fs.mkdirSync(OUT, { recursive: true });
sharp.cache(false);

let made = 0;
for (const file of fs.readdirSync(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const base = file.replace(/\.[^.]+$/, "");
  const input = path.join(SRC, file);
  const srcTime = fs.statSync(input).mtimeMs;
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    made++;
  }
}
console.log(`image variants: ${made} generated -> public/_img`);
