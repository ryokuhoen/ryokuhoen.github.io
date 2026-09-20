import Link from "next/link";
import { links, site } from "@/lib/site";
import { path, type Dict, type Locale } from "@/lib/i18n";

export default function SiteFooter({ lang, dict }: { lang: Locale; dict: Dict }) {
  const nav = [
    { href: path(lang, "/#policy"), label: dict.footer.policy },
    { href: path(lang, "/#sweets"), label: dict.footer.business },
    { href: path(lang, "/sweets"), label: dict.nav.factory },
    { href: path(lang, "/#company"), label: dict.company.h2 },
    { href: path(lang, "/#contact"), label: dict.contact.h2 },
  ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__mark">{site.wordmark}</p>
          <p className="site-footer__addr">
            {lang === "ja" ? `${site.postal} ${site.address}` : dict.contact.addressLines.join(" ")}
          </p>
        </div>
        <nav aria-label={dict.footer.siteLabel}>
          <p className="kicker kicker--light">{dict.footer.siteLabel}</p>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="u-link">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={dict.footer.brandsLabel}>
          <p className="kicker kicker--light">{dict.footer.brandsLabel}</p>
          <ul>
            <li><a href={links.tsuburano.href} target="_blank" rel="noopener noreferrer" className="u-link">つぶら乃</a></li>
            <li><a href={links.umamachi.href} target="_blank" rel="noopener noreferrer" className="u-link">馬町珈琲</a></li>
            <li><a href={links.factory.href} target="_blank" rel="noopener noreferrer" className="u-link">Tsuburano Sweets Factory</a></li>
            <li><a href={links.stores.href} target="_blank" rel="noopener noreferrer" className="u-link">TSUBURANO STORE</a></li>
          </ul>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <small>© {new Date().getFullYear()} {site.legalName}</small>
      </div>
    </footer>
  );
}
