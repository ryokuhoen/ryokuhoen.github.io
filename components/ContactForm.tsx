"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

/**
 * お問い合わせフォーム。
 * site.formEnabled が true のときは formsubmit.co 経由で info@ 宛てに送信する（info@ は ImprovMX で転送）。
 * false の間、または送信に失敗したときは、入力内容を差し込んだメール作成（mailto）を案内する。
 * ※formsubmit.co は初回送信が確認メールに使われるため、公開前に一度テスト送信して有効化すること。
 */
type Status = "idle" | "sending" | "done" | "fallback";

export default function ContactForm({ dict }: { dict: Dict }) {
  const f = dict.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("_honey") ?? "")) return; // スパム対策（人には見えない欄）
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const body = String(fd.get("message") ?? "");
    setMailto(
      `mailto:${site.email}?subject=${encodeURIComponent(f.mailSubject)}` +
        `&body=${encodeURIComponent(`${f.mailName}: ${name}\n${f.mailEmail}: ${email}\n\n${body}`)}`,
    );

    if (!site.formEnabled) {
      setStatus("fallback");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          [f.name]: name,
          [f.email]: email,
          [f.message]: body,
          _replyto: email,
          _subject: f.mailSubject,
          _template: "table",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error("send failed");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("fallback");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="f-name">{f.name}</label>
        <input id="f-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="f-email">{f.email}</label>
        <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required />
      </div>
      <div className="field">
        <label htmlFor="f-message">{f.message}</label>
        <textarea id="f-message" name="message" rows={5} required />
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
      <div className="form__foot">
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
        </button>
        {!site.formEnabled && (
          <p className="form__note">{f.note}</p>
        )}
      </div>
      {status === "done" && (
        <div className="form__notice" role="status">
          <p>{f.done}</p>
        </div>
      )}
      {status === "fallback" && (
        <div className="form__notice" role="status">
          <p>
            {site.formEnabled ? f.failed : f.preparing}
          </p>
          <a href={mailto} className="text-cta">
            {f.mailLink}
          </a>
        </div>
      )}
    </form>
  );
}
