// 5言語の表示確認用スクリーンショット。
// 使い方: 別ターミナルで out/ を配信 → node scripts/shots-i18n.mjs [prefix]
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3101";
const OUT = path.resolve("_review");
const PREFIX = process.argv[2] ?? "v7";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const LANGS = ["ja", "en", "zh", "ko", "es"];
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ executablePath: EDGE });
const problems = [];

for (const view of [
  { tag: "desktop", width: 1440, height: 900 },
  { tag: "mobile", width: 390, height: 844 },
]) {
  const ctx = await browser.newContext({ viewport: { width: view.width, height: view.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  for (const lang of LANGS) {
    await page.goto(`${BASE}/${lang}/`, { waitUntil: "networkidle" });
    await wait(1200);
    await page.screenshot({ path: path.join(OUT, `${PREFIX}-${view.tag}-${lang}-hero.png`) });

    // 言語切替を開いた状態
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll(".lang__btn")];
      const b = btns.find((x) => x.offsetParent !== null);
      b?.click();
    });
    await wait(500);
    await page.screenshot({ path: path.join(OUT, `${PREFIX}-${view.tag}-${lang}-langmenu.png`) });
    await page.keyboard.press("Escape");

    // 各セクション
    await page.evaluate(() => {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-shown", "true"));
    });
    for (const id of ["#policy", "#sweets", "#stores", "#shop", "#company", "#contact"]) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 72);
      }, id);
      await wait(700);
      await page.screenshot({ path: path.join(OUT, `${PREFIX}-${view.tag}-${lang}-sec-${id.slice(1)}.png`) });
    }

    // はみ出し・ナビの折り返しを計測
    const m = await page.evaluate(() => {
      const nav = document.querySelector(".gnav");
      const navRect = nav?.getBoundingClientRect();
      const head = document.querySelector(".site-header__inner")?.getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        navWidth: navRect ? Math.round(navRect.width) : null,
        navHeight: navRect ? Math.round(navRect.height) : null,
        headHeight: head ? Math.round(head.height) : null,
      };
    });
    if (m.overflow > 1) problems.push(`${view.tag}/${lang}: 横スクロール ${m.overflow}px`);
    if (m.navHeight && m.navHeight > 40) problems.push(`${view.tag}/${lang}: ナビが折り返し ${m.navHeight}px`);

    // /sweets
    await page.goto(`${BASE}/${lang}/sweets/`, { waitUntil: "networkidle" });
    await wait(1000);
    await page.screenshot({ path: path.join(OUT, `${PREFIX}-${view.tag}-${lang}-sweets.png`) });
    const o2 = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (o2 > 1) problems.push(`${view.tag}/${lang}/sweets: 横スクロール ${o2}px`);
  }
  await ctx.close();
}

await browser.close();
console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "計測上の問題なし（横スクロール・ナビ折り返し）");
