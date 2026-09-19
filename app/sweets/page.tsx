import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { links, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tsuburano Sweets Factory",
  description:
    "株式会社 緑歩園の自社工房 Tsuburano Sweets Factory。貴社オリジナル菓子の企画・開発・製造、小ロットからのOEMを承ります。",
  alternates: { canonical: "/sweets" },
  openGraph: { url: "/sweets", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
};

const strengths = [
  { t: "企画から製造まで一貫", d: "貴社オリジナル商品の企画・開発・製造を、自社工房で一貫して行います。" },
  { t: "小ロットから", d: "小ロットからのオリジナル商品の開発・製造を承ります。" },
  { t: "焼き菓子から生菓子まで", d: "有名洋菓子店出身のシェフパティシエが、焼き菓子から繊細な生菓子までを手がけます。" },
  { t: "徹底した衛生管理体制", d: "素材選びから製造工程まで、徹底した管理体制のもとで製造しています。" },
];

const destinations = ["百貨店", "ホテル", "航空会社 ビジネスクラス", "スーパー"];

export default function SweetsPage() {
  return (
    <>
      <section className="f-hero" aria-labelledby="f-title">
        <div className="f-hero__media">
          <Image
            src="/images/factory-terrine-tray.jpg"
            alt="朱塗りの器にのせた抹茶のテリーヌと栗のテリーヌ、化粧箱"
            fill
            preload
            quality={82}
            sizes="(min-width: 960px) 58vw, 100vw"
            className="f-hero__img"
          />
        </div>
        <div className="f-hero__copy">
          <p className="kicker kicker--ja hero-in" style={{ animationDelay: "0.1s" }}>
            緑歩園の自社工房
          </p>
          <h1 id="f-title" className="display display--latin hero-in" style={{ animationDelay: "0.25s" }}>
            <span className="nb">Tsuburano</span> <span className="nb">Sweets Factory</span>
          </h1>
          <p className="hero__lead hero-in" style={{ animationDelay: "0.4s" }}>
            <span className="nb">関西空港の近く、</span>
            <span className="nb">株式会社 緑歩園の自社工房です。</span>
          </p>
        </div>
      </section>

      <section className="section f-intro">
        <div className="container f-intro__grid">
          <div data-reveal>
            <p className="kicker">Original Sweets</p>
            <h2 className="h2">
              <span className="nb">貴社のオリジナルを、</span>
              <span className="nb">企画から製造まで。</span>
            </h2>
          </div>
          <div data-reveal>
            <p className="body">
              有名洋菓子店出身のシェフパティシエによる、繊細なお菓子をご提供します。貴社オリジナル商品の企画、開発、製造まで一貫して行います。お気軽にご相談ください。
            </p>
            <div className="cta-row">
              <a href={links.factory.href} target="_blank" rel="noopener noreferrer" className="text-cta">
                <span className="nb">Tsuburano Sweets Factory</span>
                <span className="nb">{links.factory.label}</span>
                <span className="ext-mark" aria-hidden="true">↗</span>
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="f-gallery" aria-label="工房と製品の写真">
        <div className="container f-gallery__grid">
          <figure className="photo g1" data-reveal>
            <Image src="/images/factory-hero-yawaokoshi.jpg" alt="黒い石板に並んだ、色とりどりの絵柄の菓子" width={2400} height={1600} sizes="(min-width: 960px) 62vw, 100vw" quality={82} />
          </figure>
          <figure className="photo g2" data-reveal>
            <Image src="/images/factory-oven.jpg" alt="工房のデッキオーブン" width={1350} height={1800} sizes="(min-width: 960px) 28vw, 60vw" quality={75} />
            <figcaption className="caption">デッキオーブン</figcaption>
          </figure>
          <figure className="photo g3" data-reveal>
            <Image src="/images/factory-hoiro.jpg" alt="工房のホイロ（発酵機）" width={1350} height={1800} sizes="(min-width: 960px) 24vw, 60vw" quality={75} />
            <figcaption className="caption">ホイロ</figcaption>
          </figure>
          <figure className="photo g4" data-reveal>
            <Image src="/images/factory-gift-box.jpg" alt="つぶら乃の化粧箱（黒と白）" width={2400} height={1600} sizes="(min-width: 960px) 60vw, 100vw" quality={75} />
          </figure>
        </div>
      </section>

      <section className="section f-strengths" aria-labelledby="strength-title">
        <div className="container f-strengths__grid">
          <div data-reveal>
            <p className="kicker">Quality</p>
            <h2 id="strength-title" className="h2">製造の強み</h2>
          </div>
          <ol className="f-strengths__list" data-reveal>
            {strengths.map((s, i) => (
              <li key={s.t}>
                <span className="f-strengths__no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="h3">{s.t}</h3>
                  <p className="body">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section f-dest" aria-labelledby="dest-title">
        <div className="container f-dest__grid">
          <figure className="photo" data-reveal>
            <Image src="/images/factory-yawaokoshi-box.jpg" alt="化粧箱と、六種の絵柄の菓子" width={2400} height={1600} sizes="(min-width: 960px) 50vw, 100vw" quality={75} />
          </figure>
          <div data-reveal>
            <p className="kicker">Partners</p>
            <h2 id="dest-title" className="h2">主な提供先</h2>
            <p className="body">
              JR京都伊勢丹をはじめ、次のようなお客様へオリジナルのお菓子をお届けしています。
            </p>
            <ul className="f-dest__list">
              {destinations.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="f-contact" aria-labelledby="f-contact-title">
        <div className="container f-contact__grid">
          <div>
            <p className="kicker kicker--light">Contact</p>
            <h2 id="f-contact-title" className="h2">製造のご相談</h2>
          </div>
          <div className="f-contact__body">
            <p className="f-contact__label">TSUBURANO SWEETS FACTORY</p>
            <p className="f-contact__tel">
              <span className="f-contact__tel-label">TEL</span>
              <a href={`tel:${site.factoryTel.replace(/-/g, "")}`} className="num">
                {site.factoryTel}
              </a>
            </p>
            <div className="cta-row">
              <Link href="/#contact" className="text-cta text-cta--light">
                フォームでお問い合わせ
              </Link>
              <Link href="/" className="text-cta text-cta--light text-cta--quiet">
                緑歩園トップへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
