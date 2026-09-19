"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Scene = {
  src: string;
  alt: string;
  w: number;
  h: number;
  no: string;
  kicker: string;
  title?: string[];
  caption?: string;
  layout: "full" | "split-right" | "split-left";
  /** モバイル（全面表示）時の object-position */
  pos: string;
  /** デスクトップ全面時の object-position */
  posWide?: string;
};

const scenes: Scene[] = [
  {
    src: "/images/hero-01-yasaka-night.jpg",
    alt: "夜桜越しに見る八坂の塔（京都・東山）",
    w: 2560,
    h: 1708,
    no: "01",
    kicker: "Higashiyama",
    layout: "full",
    pos: "12% 50%",
    posWide: "50% 42%",
  },
  {
    src: "/images/hero-02-noren-garden.jpg",
    alt: "暖簾のかかる入口と苔の庭、飛び石",
    w: 1335,
    h: 2000,
    no: "02",
    kicker: "Entrance",
    title: ["暖簾をくぐり、", "裏庭へ。"],
    caption: "清水の参道から、一歩内へ。",
    layout: "split-right",
    pos: "50% 60%",
  },
  {
    src: "/images/hero-03-momiji-eaves.jpg",
    alt: "木の軒ともみじの若葉を見上げる",
    w: 1335,
    h: 2000,
    no: "03",
    kicker: "Seasons",
    title: ["木の軒に、", "季節の色。"],
    caption: "建物と庭が、季節を映す。",
    layout: "split-left",
    pos: "40% 50%",
  },
  {
    src: "/images/hero-04-hassun.jpg",
    alt: "朱の器に盛られた八寸の料理",
    w: 2560,
    h: 1920,
    no: "04",
    kicker: "Hassun",
    title: ["季節を、", "ひと皿に。"],
    caption: "器に季節を映す、八寸。",
    layout: "full",
    pos: "60% 50%",
    posWide: "50% 58%",
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x: number) => 1 - Math.pow(1 - x, 3); // easeOutCubic 相当

export default function HeroSequence() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.dataset.static = "true";
      return;
    }
    el.dataset.static = "false";

    const sceneEls = Array.from(el.querySelectorAll<HTMLElement>("[data-scene]"));
    const segEls = Array.from(el.querySelectorAll<HTMLElement>("[data-seg]"));
    const curEl = el.querySelector<HTMLElement>("[data-current]");
    const n = sceneEls.length;
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      const t = p * (n - 1);
      el.style.setProperty("--p", p.toFixed(4));
      let active = 0;
      sceneEls.forEach((s, k) => {
        // 各場面: 前の場面で少し静止 → 0.6 区間で下から開示
        const r = k === 0 ? 1 : ease(clamp((t - (k - 1) - 0.2) / 0.6));
        s.style.setProperty("--r", r.toFixed(4));
        // 場面の滞在度（テキストの出入りに使う）
        const next = k < n - 1 ? ease(clamp((t - k - 0.2) / 0.6)) : 0;
        s.style.setProperty("--out", next.toFixed(4));
        if (r > 0.5) active = k;
        segEls[k]?.style.setProperty("--fill", r.toFixed(4));
      });
      if (curEl) curEl.textContent = String(active + 1).padStart(2, "0");
      el.dataset.darkUi = active === 1 || active === 2 ? "true" : "false";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const onMq = () => window.location.reload();
    mq.addEventListener("change", onMq);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <section ref={root} className="hero" aria-label="京都・東山から" data-static="false">
      <div className="hero__stage">
        {scenes.map((s, k) => (
          <div
            key={s.src}
            className={`scene scene--${s.layout}`}
            data-scene={k}
            style={{ zIndex: k + 1 }}
          >
            <div className="scene__media">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                preload={k === 0}
                loading={k === 0 ? undefined : "eager"}
                quality={82}
                sizes={s.layout === "full" ? "100vw" : "(min-width: 960px) 46vw, 100vw"}
                className="scene__img"
                style={
                  {
                    "--pos": s.pos,
                    "--pos-wide": s.posWide ?? s.pos,
                  } as React.CSSProperties
                }
              />
            </div>

            {k === 0 ? (
              <div className="scene__copy scene__copy--lead">
                <p className="kicker kicker--light hero-in" style={{ animationDelay: "0.1s" }}>
                  KYOTO / FOOD CULTURE
                </p>
                <h1 className="display display--hero hero-in" style={{ animationDelay: "0.25s" }}>
                  <span className="display__line nb">京の食を、</span>
                  <span className="display__line nb">
                    <span className="nb">しつらえ、ひらき、</span>
                    <span className="nb">届ける。</span>
                  </span>
                </h1>
                <div className="hero__cta hero-in" style={{ animationDelay: "0.45s" }}>
                  <Link href="/#sweets" className="text-cta text-cta--light">
                    事業を見る
                  </Link>
                  <Link href="/#contact" className="text-cta text-cta--light text-cta--quiet">
                    お問い合わせ
                  </Link>
                </div>
              </div>
            ) : (
              <div className="scene__copy">
                <p className="scene__no">
                  <span>{s.no}</span>
                  <span className="scene__dash" aria-hidden="true" />
                  <span>{s.kicker}</span>
                </p>
                <h2 className="scene__title">
                  {s.title?.map((t) => (
                    <span key={t} className="nb">{t}</span>
                  ))}
                </h2>
                {s.caption && <p className="scene__caption">{s.caption}</p>}
              </div>
            )}
          </div>
        ))}

        <div className="hero__progress" aria-hidden="true">
          <span className="hero__count">
            <span data-current>01</span>
            <span className="hero__count-sep">/</span>
            <span>04</span>
          </span>
          <span className="hero__segs">
            {scenes.map((s, k) => (
              <span key={s.no} className="hero__seg" data-seg={k} />
            ))}
          </span>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-label">Scroll</span>
        </div>
      </div>
    </section>
  );
}
