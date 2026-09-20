import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { links, site } from "@/lib/site";
import { getDict, htmlLang, locales, ogLocale, path, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const d = getDict(lang);
  const languages: Record<string, string> = { "x-default": path("ja", "/sweets") };
  for (const l of locales) languages[htmlLang[l]] = path(l, "/sweets");
  return {
    title: d.meta.factoryTitle,
    description: d.meta.factoryDescription,
    alternates: { canonical: path(lang, "/sweets"), languages },
    openGraph: {
      url: path(lang, "/sweets"),
      locale: ogLocale[lang],
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function SweetsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Locale };
  const d = getDict(lang);
  return (
    <>
      <section className="f-hero" aria-labelledby="f-title">
        <div className="f-hero__media">
          <Image
            src="/images/factory-terrine-tray.jpg"
            alt={d.factory.heroAlt}
            fill
            preload
            quality={82}
            sizes="(min-width: 960px) 58vw, 100vw"
            className="f-hero__img"
          />
        </div>
        <div className="f-hero__copy">
          <p className="kicker kicker--ja hero-in" style={{ animationDelay: "0.1s" }}>
            {d.factory.kicker}
          </p>
          <h1 id="f-title" className="display display--latin hero-in" style={{ animationDelay: "0.25s" }}>
            <span className="nb">{d.factory.title[0]}</span> <span className="nb">{d.factory.title[1]}</span>
          </h1>
          <p className="hero__lead hero-in" style={{ animationDelay: "0.4s" }}>
            <span className="nb">{d.factory.lead[0]}</span>
            <span className="nb">{d.factory.lead[1]}</span>
          </p>
        </div>
      </section>

      <section className="section f-intro">
        <div className="container f-intro__grid">
          <div data-reveal>
            <p className="kicker">{d.factory.introKicker}</p>
            <h2 className="h2">
              <span className="nb">{d.factory.introH2[0]}</span>
              <span className="nb">{d.factory.introH2[1]}</span>
            </h2>
          </div>
          <div data-reveal>
            <p className="body">
              {d.factory.introBody}
            </p>
            <div className="cta-row">
              <a href={links.factory.href} target="_blank" rel="noopener noreferrer" className="text-cta">
                <span className="nb">Tsuburano Sweets Factory</span>
                <span className="nb">{links.factory.label}</span>
                <span className="ext-mark" aria-hidden="true">↗</span>
                <span className="sr-only">{d.nav.newTab}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="f-gallery" aria-label={d.factory.galleryLabel}>
        <div className="container f-gallery__grid">
          <figure className="photo g1" data-reveal>
            <Image src="/images/factory-hero-yawaokoshi.jpg" alt={d.factory.gallery[0].alt} width={2400} height={1600} sizes="(min-width: 960px) 62vw, 100vw" quality={82} />
          </figure>
          <figure className="photo g2" data-reveal>
            <Image src="/images/factory-oven.jpg" alt={d.factory.gallery[1].alt} width={1350} height={1800} sizes="(min-width: 960px) 28vw, 60vw" quality={75} />
            <figcaption className="caption">{d.factory.gallery[1].caption}</figcaption>
          </figure>
          <figure className="photo g3" data-reveal>
            <Image src="/images/factory-hoiro.jpg" alt={d.factory.gallery[2].alt} width={1350} height={1800} sizes="(min-width: 960px) 24vw, 60vw" quality={75} />
            <figcaption className="caption">{d.factory.gallery[2].caption}</figcaption>
          </figure>
          <figure className="photo g4" data-reveal>
            <Image src="/images/factory-gift-box.jpg" alt={d.factory.gallery[3].alt} width={2400} height={1600} sizes="(min-width: 960px) 60vw, 100vw" quality={75} />
          </figure>
        </div>
      </section>

      <section className="section f-strengths" aria-labelledby="strength-title">
        <div className="container f-strengths__grid">
          <div data-reveal>
            <p className="kicker">{d.factory.strengthKicker}</p>
            <h2 id="strength-title" className="h2">{d.factory.strengthH2}</h2>
          </div>
          <ol className="f-strengths__list" data-reveal>
            {d.factory.strengths.map((s, i) => (
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
            <Image src="/images/factory-yawaokoshi-box.jpg" alt={d.factory.destAlt} width={2400} height={1600} sizes="(min-width: 960px) 50vw, 100vw" quality={75} />
          </figure>
          <div data-reveal>
            <p className="kicker">{d.factory.destKicker}</p>
            <h2 id="dest-title" className="h2">{d.factory.destH2}</h2>
            <p className="body">
              {d.factory.destBody}
            </p>
            <ul className="f-dest__list">
              {d.factory.destinations.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="f-contact" aria-labelledby="f-contact-title">
        <div className="container f-contact__grid">
          <div>
            <p className="kicker kicker--light">{d.factory.contactKicker}</p>
            <h2 id="f-contact-title" className="h2">{d.factory.contactH2}</h2>
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
              <Link href={path(lang, "/#contact")} className="text-cta text-cta--light">
                {d.factory.contactForm}
              </Link>
              <Link href={path(lang)} className="text-cta text-cta--light text-cta--quiet">
                {d.factory.contactHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
