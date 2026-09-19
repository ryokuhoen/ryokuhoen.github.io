// ローカル確認用スクリーンショット。Playwright-core + 端末の Microsoft Edge を使用（ブラウザのダウンロード不要）。
// 使い方: npm run start（別ターミナル） → npm run shots [prefix]
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const OUT = path.resolve("_review");
const PREFIX = process.argv[2] ?? "v1";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
fs.mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function heroShots(page, tag) {
  const info = await page.evaluate(() => {
    const h = document.querySelector(".hero");
    return { top: h.offsetTop, total: h.offsetHeight - window.innerHeight };
  });
  // 0=初期, 0.17=01→02の途中, 0.30=02, 0.50=02→03途中, 0.63=03, 0.97=04
  const stops = [0, 0.17, 0.3, 0.5, 0.63, 0.97];
  for (const s of stops) {
    await page.evaluate((y) => window.scrollTo(0, y), info.top + info.total * s);
    await wait(s === 0 ? 1600 : 700);
    await page.screenshot({ path: path.join(OUT, `${PREFIX}-${tag}-hero-${String(Math.round(s * 100)).padStart(3, "0")}.png`) });
  }
}

async function sectionShots(page, tag, ids) {
  for (const id of ids) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 72);
    }, id);
    await wait(1100);
    await page.screenshot({ path: path.join(OUT, `${PREFIX}-${tag}-sec-${id.replace(/[#.]/g, "")}.png`) });
  }
}

async function revealAll(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await wait(60);
  }
  await wait(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(300);
}

async function overflowCheck(page, label) {
  const r = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
  }));
  console.log(`${label}: scrollWidth=${r.sw} innerWidth=${r.iw} ${r.sw > r.iw ? "!! 横スクロール発生" : "OK"}`);
}

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const viewports = [
  { tag: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
  { tag: "mobile", width: 390, height: 844, dsf: 2, mobile: true },
];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await overflowCheck(page, `${vp.tag} /`);
  await heroShots(page, vp.tag);
  await sectionShots(page, vp.tag, ["#policy", "#sweets", "#stores", "#shop", "#company", "#contact", ".site-footer"]);

  const p2 = await ctx.newPage();
  await p2.goto(`${BASE}/sweets`, { waitUntil: "networkidle" });
  await p2.evaluate(() => document.fonts.ready);
  await overflowCheck(p2, `${vp.tag} /sweets`);
  await wait(1400);
  await p2.screenshot({ path: path.join(OUT, `${PREFIX}-${vp.tag}-sweets-hero.png`) });
  await revealAll(p2);
  await p2.screenshot({ path: path.join(OUT, `${PREFIX}-${vp.tag}-sweets-full.png`), fullPage: true });

  if (vp.mobile) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(300);
    await page.click(".menu-btn");
    await wait(400);
    await page.screenshot({ path: path.join(OUT, `${PREFIX}-${vp.tag}-menu.png`) });
  }
  await ctx.close();
}

// 動きを減らす設定: ヒーローが4枚縦並びの静止表示になるか
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await wait(800);
  await page.screenshot({ path: path.join(OUT, `${PREFIX}-reduced-motion-hero.png`), clip: { x: 0, y: 0, width: 1440, height: 900 * 4 }, fullPage: true });
  await ctx.close();
}

await browser.close();
console.log("done");
