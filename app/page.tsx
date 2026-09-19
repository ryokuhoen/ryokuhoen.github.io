import Image from "next/image";
import Link from "next/link";
import HeroSequence from "@/components/HeroSequence";
import ContactForm from "@/components/ContactForm";
import { businessAreas, links, site } from "@/lib/site";

function Ext({ href, children, className = "text-cta" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="ext-mark" aria-hidden="true">↗</span>
      <span className="sr-only">（新しいタブで開きます）</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <HeroSequence />

      {/* ───── 理念 ───── */}
      <section id="policy" className="section policy">
        <div className="container policy__grid">
          <div className="policy__text" data-reveal>
            <p className="kicker">Our Policy</p>
            <h2 className="h2">
              <span className="nb">京都発、</span>
              <span className="nb">食文化の発信。</span>
            </h2>
            <p className="body">
              京都・東山、八坂の塔のふもと。築100年の数寄屋造りの建物が、当社の本店〈京都つぶら乃本店〉です。ここを拠点に、伝統の味に新しい価値を加えるため、五条に自家焙煎のカフェを、関西空港の近くにスイーツの製造と卸を手がける自社工房を構えています。
            </p>
          </div>
          <figure className="policy__media photo" data-reveal>
            <Image
              src="/images/policy-honten-street.jpg"
              alt="八坂の塔へ続く坂道と、つぶら乃京都本店の外観"
              width={2400}
              height={1601}
              sizes="(min-width: 960px) 58vw, 100vw"
              quality={82}
            />
            <figcaption className="caption">東山・八坂の塔へ続く坂道　つぶら乃京都本店</figcaption>
          </figure>
        </div>
      </section>

      {/* ───── 事業 01 スイーツ ───── */}
      <section id="sweets" className="section biz biz--sweets" aria-labelledby="sweets-title">
        <div className="container">
          <p className="section-index" data-reveal>
            <span>Business</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span>01 / 03</span>
          </p>
        </div>
        <div className="biz__grid container">
          <figure className="biz__media photo" data-reveal>
            <Image
              src="/images/sweets-dorayaki.jpg"
              alt="つぶら乃のどら焼き。抹茶とショコラの生地で、わらび餅とクリームをはさんだ断面。スレートの上に茶葉が散る"
              width={2000}
              height={1125}
              sizes="(min-width: 960px) 60vw, 100vw"
              quality={82}
            />
            <figcaption className="caption">
              <span className="nb">つぶら乃のどら焼き</span>　<span className="nb">抹茶とショコラ、</span><span className="nb">わらび餅とクリームをはさんで</span>
            </figcaption>
          </figure>
          <div className="biz__text" data-reveal>
            <p className="kicker">Sweets</p>
            <h2 id="sweets-title" className="h2">スイーツ製造・販売</h2>
            <p className="biz__lead">
              <span className="nb">素材を生かし、</span>
              <span className="nb">丁寧に焼き上げる。</span>
            </p>
            <p className="body">
              有名洋菓子店で修業を積んだシェフパティシエを迎え、焼き菓子から繊細な生菓子までを自社工房でつくっています。JR京都伊勢丹をはじめ、百貨店やスーパーなど幅広いお客様へオリジナルのお菓子をお届けし、小ロットからのOEM・商品開発も承ります。
            </p>
            <div className="cta-row">
              <Link href="/sweets" className="text-cta">
                自社工房を見る
              </Link>
              <Ext href={links.factory.href} className="text-cta text-cta--quiet">
                <span className="nb">Tsuburano Sweets Factory</span>
                <span className="nb">{links.factory.label}</span>
              </Ext>
            </div>
            <figure className="biz__inset photo" data-reveal>
              <Image
                src="/images/factory-oven.jpg"
                alt="自社工房のデッキオーブン"
                width={1350}
                height={1800}
                sizes="(min-width: 960px) 16vw, 40vw"
                quality={75}
              />
              <figcaption className="caption">自社工房　デッキオーブン</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ───── 事業 02 店舗 ───── */}
      <section id="stores" className="section biz biz--stores" aria-labelledby="stores-title">
        <div className="container">
          <p className="section-index" data-reveal>
            <span>Business</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span>02 / 03</span>
          </p>
          <div className="stores__head" data-reveal>
            <div>
              <p className="kicker">Stores</p>
              <h2 id="stores-title" className="h2">店舗運営</h2>
            </div>
            <p className="body stores__intro">
              京都・東山のお食事処・甘味処〈つぶら乃京都本店〉、新宿御苑内の〈つぶら乃新宿御苑店〉、自社焙煎の珈琲とスイーツの〈馬町珈琲〉。京都を散策の際は、ぜひお立ち寄りください。
            </p>
          </div>
        </div>

        <div className="container stores__grid">
          <article className="store store--main" data-reveal>
            <figure className="photo">
              <Image
                src="/images/stores-honten-bento.jpg"
                alt="つぶら乃の幕の内弁当。だし巻き、焼き物、炊き合わせなど"
                width={2400}
                height={1600}
                sizes="(min-width: 960px) 58vw, 100vw"
                quality={82}
              />
            </figure>
            <div className="store__meta">
              <h3 className="h3">つぶら乃 京都本店</h3>
              <p className="store__desc">お食事処・甘味処</p>
              <p className="store__addr">京都市東山区八坂上町368-1-8</p>
              <Ext href={links.tsuburano.href}>{links.tsuburano.label}</Ext>
            </div>
          </article>

          <article className="store store--sub store--shinjuku" data-reveal>
            <figure className="photo">
              <Image
                src="/images/stores-shinjuku-interior.jpg"
                alt="つぶら乃新宿御苑店の店内。木のカウンターと白い暖簾"
                width={1500}
                height={2000}
                sizes="(min-width: 960px) 26vw, 100vw"
                quality={75}
              />
            </figure>
            <div className="store__meta">
              <h3 className="h3">つぶら乃 新宿御苑店</h3>
              <p className="store__desc">2022年3月 開店</p>
              <p className="store__addr">東京都新宿区内藤町11（新宿御苑内）</p>
              <Ext href={links.tsuburano.href}>{links.tsuburano.label}</Ext>
            </div>
          </article>

          <article className="store store--sub store--umamachi" data-reveal>
            <figure className="photo">
              <Image
                src="/images/stores-umamachi-exterior.jpg"
                alt="馬町珈琲の外観。赤い柱と UMAMACHI COFFEE の看板"
                width={1800}
                height={1012}
                sizes="(min-width: 960px) 30vw, 100vw"
                quality={75}
              />
            </figure>
            <div className="store__meta">
              <h3 className="h3">馬町珈琲</h3>
              <p className="store__desc">自社焙煎の珈琲とスイーツ</p>
              <Ext href={links.umamachi.href}>{links.umamachi.label}</Ext>
            </div>
          </article>
        </div>
      </section>

      {/* ───── 事業 03 オンラインストア ───── */}
      <section id="shop" className="section biz biz--shop" aria-labelledby="shop-title">
        <div className="container">
          <p className="section-index" data-reveal>
            <span>Business</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span>03 / 03</span>
          </p>
        </div>
        <div className="biz__grid biz__grid--rev biz__grid--shop container">
          <figure className="biz__media biz__media--small photo" data-reveal>
            <Image
              src="/images/shop-kyoto-voyage.jpg"
              alt="つぶら乃「京都ヴォヤージュ」の焼き菓子。白い皿に色とりどりのクッキーやマカロンが並ぶ"
              width={666}
              height={719}
              sizes="(min-width: 960px) 440px, 100vw"
              quality={82}
            />
            <figcaption className="caption">つぶら乃「京都ヴォヤージュ」の焼き菓子</figcaption>
          </figure>
          <div className="biz__text" data-reveal>
            <p className="kicker">Online Store</p>
            <h2 id="shop-title" className="h2">オンラインストア</h2>
            <p className="biz__lead">
              <span className="nb">工房から、</span>
              <span className="nb">ご家庭の食卓へ。</span>
            </p>
            <p className="body">
              自社工房から直送する〈つぶら乃〉のお菓子をお届けしています。世界各地から選んだフェアトレードの生豆を、GIESEN社製の焙煎機でじっくり焙煎したオリジナルブレンドのコーヒー豆もご用意しています。
            </p>
            <div className="cta-row">
              <Ext href={links.stores.href}>TSUBURANO STORE</Ext>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 会社概要 + 事業領域 ───── */}
      <section id="company" className="section company" aria-labelledby="company-title">
        <div className="container company__grid">
          <div className="company__text" data-reveal>
            <p className="kicker">Company</p>
            <h2 id="company-title" className="h2">会社概要</h2>
            <dl className="deflist">
              <div>
                <dt>商号</dt>
                <dd>{site.legalName}</dd>
              </div>
              <div>
                <dt>資本金</dt>
                <dd>{site.capital}</dd>
              </div>
            </dl>

            <div id="trust" className="trust" aria-labelledby="trust-title">
              <h3 id="trust-title" className="trust__title">事業領域</h3>
              <ul className="trust__list">
                {businessAreas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <figure className="company__media photo" data-reveal>
            <Image
              src="/images/company-matcha.jpg"
              alt="黒い器の抹茶と、和紙に添えた二色の菓子"
              width={2400}
              height={1602}
              sizes="(min-width: 960px) 64vw, 100vw"
              quality={75}
            />
          </figure>
        </div>
      </section>

      {/* ───── お問い合わせ ───── */}
      <section id="contact" className="section contact" aria-labelledby="contact-title">
        <div className="container contact__grid">
          <div className="contact__info" data-reveal>
            <p className="kicker">Contact</p>
            <h2 id="contact-title" className="h2">お問い合わせ</h2>
            <p className="body">
              お取引、OEM・商品開発のご相談、店舗についてのお問い合わせは、こちらからお寄せください。
            </p>
            <dl className="contact__direct">
              <div>
                <dt>所在地</dt>
                <dd>
                  {site.postal}
                  <br />
                  <span className="nb">京都府京都市東山区</span>
                  <span className="nb">八坂上町368-1</span>
                </dd>
              </div>
              <div>
                <dt>電話</dt>
                <dd>
                  <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num u-link">
                    {site.tel}
                  </a>
                </dd>
              </div>
              <div>
                <dt>メール</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="u-link">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="contact__form" data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
