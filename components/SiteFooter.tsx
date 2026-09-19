import Link from "next/link";
import { links, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__mark">{site.wordmark}</p>
          <p className="site-footer__addr">
            {site.postal} {site.address}
          </p>
        </div>
        <nav aria-label="サイト内">
          <p className="kicker kicker--light">Site</p>
          <ul>
            <li><Link href="/#policy" className="u-link">理念</Link></li>
            <li><Link href="/#sweets" className="u-link">事業</Link></li>
            <li><Link href="/sweets" className="u-link">自社工房</Link></li>
            <li><Link href="/#company" className="u-link">会社概要</Link></li>
            <li><Link href="/#contact" className="u-link">お問い合わせ</Link></li>
          </ul>
        </nav>
        <nav aria-label="グループのブランド">
          <p className="kicker kicker--light">Brands</p>
          <ul>
            <li><a href={links.tsuburano.href} target="_blank" rel="noopener noreferrer" className="u-link">つぶら乃</a></li>
            <li><a href={links.umamachi.href} target="_blank" rel="noopener noreferrer" className="u-link">馬町珈琲</a></li>
            <li><a href={links.factory.href} target="_blank" rel="noopener noreferrer" className="u-link">Tsuburano Sweets Factory</a></li>
            <li><a href={links.stores.href} target="_blank" rel="noopener noreferrer" className="u-link">TSUBURANO STORE</a></li>          </ul>
        </nav>
      </div>
      <div className="container site-footer__bottom">
        <small>© {new Date().getFullYear()} {site.legalName}</small>
      </div>
    </footer>
  );
}
