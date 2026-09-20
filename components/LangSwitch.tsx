"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeName, localeShort, type Locale } from "@/lib/i18n";

/** 今のパスから言語部分だけを差し替える（/en/sweets/ → /ko/sweets/） */
function swap(pathname: string, to: Locale) {
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const clean = rest.replace(/^\//, "");
  return `/${to}/${clean}`;
}

export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}/`;
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang" ref={box}>
      <button
        type="button"
        className="lang__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang__globe" aria-hidden="true" />
        <span className="lang__cur">{localeShort[lang]}</span>
      </button>
      <ul className="lang__menu" role="menu" data-open={open} hidden={!open}>
        {locales.map((l) => (
          <li key={l} role="none">
            <a
              role="menuitem"
              href={swap(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? "true" : undefined}
              className="lang__item"
            >
              {localeName[l]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
