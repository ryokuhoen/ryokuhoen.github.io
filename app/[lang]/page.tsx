import Image from "next/image";
import Link from "next/link";
import HeroSequence from "@/components/HeroSequence";
import ContactForm from "@/components/ContactForm";
import { links, site } from "@/lib/site";
import { getDict, locales, path, type Locale } from "@/lib/i18n";

function Ext({ href, children, className = "text-cta" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="ext-mark" aria-hidden="true">↗</span>
      <span className="sr-only">（新しいタブで開きます）</span>
    </a>
  );
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const d = getDict(lang);
  return (
    <>
      <HeroSequence lang={lang} dict={d} />

      {/* ───── 理念 ───── */}
      <section id="policy" className="section policy">
        <div className="container policy__grid">
          <div className="policy__text" data-reveal>
            <p className="kicker">{d.policy.kicker}</p>
            <h2 className="h2">
              <span className="nb">{d.policy.h2[0]}</span>
              <span className="nb">{d.policy.h2[1]}</span>
            </h2>
            <p className="body">
              {d.policy.body}
            </p>
          </div>
          <figure className="policy__media photo" data-reveal>
            <Image
              src="/images/policy-honten-street.jpg"
              alt={d.policy.alt}
              width={2400}
              height={1601}
              sizes="(min-width: 960px) 58vw, 100vw"
              quality={82}
            />
            <figcaption className="caption">{d.policy.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* ───── 事業 01 スイーツ ───── */}
      <section id="sweets" className="section biz biz--sweets" aria-labelledby="sweets-title">
        <div className="container">
          <p className="section-index" data-reveal>
            <span>{d.sweets.index}</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span>01 / 03</span>
          </p>
        </div>
        <div className="biz__grid container">
          <figure className="biz__media photo" data-reveal>
            <Image
              src="/images/sweets-dorayaki.jpg"
              alt={d.sweets.alt}
              width={2000}
              height={1125}
              sizes="(min-width: 960px) 60vw, 100vw"
              quality={82}
            />
            <figcaption className="caption">
              <span className="nb">{d.sweets.caption[0]}</span>　<span className="nb">{d.sweets.caption[1]}</span>
              <span className="nb">{d.sweets.caption[2]}</span>
            </figcaption>
          </figure>
          <div className="biz__text" data-reveal>
            <p className="kicker">{d.sweets.kicker}</p>
            <h2 id="sweets-title" className="h2">{d.sweets.h2}</h2>
            <p className="biz__lead">
              <span className="nb">{d.sweets.lead[0]}</span>
              <span className="nb">{d.sweets.lead[1]}</span>
            </p>
            <p className="body">
              {d.sweets.body}
            </p>
            <div className="cta-row">
              <Link href={path(lang, "/sweets")} className="text-cta">
                {d.sweets.cta}
              </Link>
              <Ext href={links.factory.href} className="text-cta text-cta--quiet">
                <span className="nb">Tsuburano Sweets Factory</span>
                <span className="nb">{links.factory.label}</span>
              </Ext>
            </div>
            <figure className="biz__inset photo" data-reveal>
              <Image
                src="/images/factory-oven.jpg"
                alt={d.sweets.insetAlt}
                width={1350}
                height={1800}
                sizes="(min-width: 960px) 16vw, 40vw"
                quality={75}
              />
              <figcaption className="caption">{d.sweets.insetCaption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ───── 事業 02 店舗 ───── */}
      <section id="stores" className="section biz biz--stores" aria-labelledby="stores-title">
        <div className="container">
          <p className="section-index" data-reveal>
            <span>{d.stores.index}</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span>02 / 03</span>
          </p>
          <div className="stores__head" data-reveal>
            <div>
              <p className="kicker">{d.stores.kicker}</p>
              <h2 id="stores-title" className="h2">{d.stores.h2}</h2>
            </div>
            <p className="body stores__intro">
              {d.stores.intro}
            </p>
          </div>
        </div>

        <div className="container stores__grid">
          <article className="store store--main" data-reveal>
            <figure className="photo">
              <Image
                src="/images/stores-honten-bento.jpg"
                alt={d.stores.items[0].alt}
                width={2400}
                height={1600}
                sizes="(min-width: 960px) 58vw, 100vw"
                quality={82}
              />
            </figure>
            <div className="store__meta">
              <h3 className="h3">{d.stores.items[0].name}</h3>
              <p className="store__desc">{d.stores.items[0].desc}</p>
              <p className="store__addr">{d.stores.items[0].addr}</p>
              <Ext href={links.tsuburano.href}>{links.tsuburano.label}</Ext>
            </div>
          </article>

          <article className="store store--sub store--shinjuku" data-reveal>
            <figure className="photo">
              <Image
                src="/images/stores-shinjuku-interior.jpg"
                alt={d.stores.items[1].alt}
                width={1500}
                height={2000}
                sizes="(min-width: 960px) 26vw, 100vw"
                quality={75}
              />
            </figure>
            <div className="store__meta">
              <h3 className="h3">{d.stores.items[1].name}</h3>
              <p className="store__desc">{d.stores.items[1].desc}</p>
              <p className="store__addr">{d.stores.items[1].addr}</p>
              <Ext href={links.tsuburano.href}>{links.tsuburano.label}</Ext>
            </div>
          </article>

          <article className="store store--sub store--umamachi" data-reveal>
            <figure className="photo">
              <Image
                src="/images/stores-umamachi-exterior.jpg"
                alt={d.stores.items[2].alt}
                width={1800}
                height={1012}
                sizes="(min-width: 960px) 30vw, 100vw"
                quality={75}
              />
            </figure>
            <div className="store__meta">
              <h3 className="h3">{d.stores.items[2].name}</h3>
              <p className="store__desc">{d.stores.items[2].desc}</p>
              <Ext href={links.umamachi.href}>{links.umamachi.label}</Ext>
            </div>
          </article>
        </div>
      </section>

      {/* ───── 事業 03 オンラインストア ───── */}
      <section id="shop" className="section biz biz--shop" aria-labelledby="shop-title">
        <div className="container">
          <p className="section-index" data-reveal>
            <span>{d.shop.index}</span>
            <span className="section-index__rule" aria-hidden="true" />
            <span>03 / 03</span>
          </p>
        </div>
        <div className="biz__grid biz__grid--rev biz__grid--shop container">
          <figure className="biz__media biz__media--small photo" data-reveal>
            <Image
              src="/images/shop-kyoto-voyage.jpg"
              alt={d.shop.alt}
              width={666}
              height={719}
              sizes="(min-width: 960px) 440px, 100vw"
              quality={82}
            />
            <figcaption className="caption">{d.shop.caption}</figcaption>
          </figure>
          <div className="biz__text" data-reveal>
            <p className="kicker">{d.shop.kicker}</p>
            <h2 id="shop-title" className="h2">{d.shop.h2}</h2>
            <p className="biz__lead">
              <span className="nb">{d.shop.lead[0]}</span>
              <span className="nb">{d.shop.lead[1]}</span>
            </p>
            <p className="body">
              {d.shop.body}
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
            <p className="kicker">{d.company.kicker}</p>
            <h2 id="company-title" className="h2">{d.company.h2}</h2>
            <dl className="deflist">
              <div>
                <dt>{d.company.nameLabel}</dt>
                <dd>{lang === "ja" ? site.legalName : site.nameEn}</dd>
              </div>
              <div>
                <dt>{d.company.capitalLabel}</dt>
                <dd>{site.capital}</dd>
              </div>
            </dl>

            <div id="trust" className="trust" aria-labelledby="trust-title">
              <h3 id="trust-title" className="trust__title">{d.company.trustTitle}</h3>
              <ul className="trust__list">
                {d.company.areas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <figure className="company__media photo" data-reveal>
            <Image
              src="/images/company-matcha.jpg"
              alt={d.company.alt}
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
            <p className="kicker">{d.contact.kicker}</p>
            <h2 id="contact-title" className="h2">{d.contact.h2}</h2>
            <p className="body">
              {d.contact.body}
            </p>
            <dl className="contact__direct">
              <div>
                <dt>{d.contact.addressLabel}</dt>
                <dd>
                  <span className="nb">{d.contact.addressLines[0]}</span>
                  <span className="nb">{d.contact.addressLines[1]}</span>
                </dd>
              </div>
              <div>
                <dt>{d.contact.telLabel}</dt>
                <dd>
                  <a href={`tel:${site.tel.replace(/-/g, "")}`} className="num u-link">
                    {site.tel}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{d.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="u-link">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="contact__form" data-reveal>
            <ContactForm dict={d} />
          </div>
        </div>
      </section>
    </>
  );
}
