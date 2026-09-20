"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, site } from "@/lib/site";
import { path, type Dict, type Locale } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";

const ext = [
  { href: links.tsuburano.href, label: "つぶら乃" },
  { href: links.umamachi.href, label: "馬町珈琲" },
  { href: links.stores.href, label: "Store" },
];

export default function SiteHeader({ lang, dict }: { lang: Locale; dict: Dict }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = path(lang);

  const nav = [
    { href: path(lang, "/#sweets"), label: dict.nav.business },
    { href: path(lang, "/sweets"), label: dict.nav.factory },
    { href: path(lang, "/#company"), label: dict.nav.company },
    { href: path(lang, "/#contact"), label: dict.nav.contact },
  ];

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isHome = pathname === home || pathname === home.replace(/\/$/, "");

  return (
    <header className="site-header" data-solid={solid || open || !isHome ? "true" : "false"}>
      <div className="site-header__inner">
        <Link href={home} className="wordmark" aria-label={`${site.legalName} ${dict.nav.home}`}>
          {dict.meta.wordmark}
        </Link>

        <nav className="gnav" aria-label={dict.nav.business}>
          <ul className="gnav__main">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="u-link"
                  aria-current={n.href === pathname ? "page" : undefined}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="gnav__rule" aria-hidden="true" />
          <ul className="gnav__ext">
            {ext.map((n) => (
              <li key={n.href}>
                <a href={n.href} target="_blank" rel="noopener noreferrer" className="u-link">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <LangSwitch lang={lang} label={dict.nav.language} />
        </nav>

        <div className="site-header__mobile">
          <LangSwitch lang={lang} label={dict.nav.language} />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-btn__label">{open ? dict.nav.close : dict.nav.menu}</span>
            <span className="menu-btn__lines" aria-hidden="true" data-open={open} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" data-open={open} hidden={!open}>
        <ul className="mobile-menu__main">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mobile-menu__ext">
          {ext.map((n) => (
            <li key={n.href}>
              <a href={n.href} target="_blank" rel="noopener noreferrer">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mobile-menu__tel">
          <a href={`tel:${site.tel.replace(/-/g, "")}`}>TEL {site.tel}</a>
        </p>
      </div>
    </header>
  );
}
