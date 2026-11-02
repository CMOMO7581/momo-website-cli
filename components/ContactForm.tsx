"use client";
import { useRef, useState, type FormEvent } from "react";
import { copyText } from "./copyText";
import type { Dict } from "@/lib/content";

const TO = "cc79336@eid.utexas.edu";

export default function ContactForm({ t }: { t: Dict }) {
  const ui = t.ui;
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState<{ text: string; mailto: string } | null>(null);
  const pre = useRef<HTMLPreElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    const name = get("name"), email = get("email"), msg = get("message");
    const sel = form.elements.namedItem("topic") as HTMLSelectElement;
    const topic = sel.options[sel.selectedIndex].text;
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) { setError(true); return; }
    setError(false);
    const subject = topic + ui.from + name;
    const body = msg + "\n\n" + name + "\n" + email;
    setDraft({
      text: "To: " + TO + "\nSubject: " + subject + "\n\n" + body,
      mailto: "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body),
    });
  }

  return (
    <form id="contactForm" noValidate onSubmit={submit}>
      <div className="row2">
        <div><label htmlFor="cf-name">{t["f.name"]}</label><input id="cf-name" name="name" autoComplete="name" required /></div>
        <div><label htmlFor="cf-email">{t["f.email"]}</label><input id="cf-email" name="email" type="email" autoComplete="email" required /></div>
      </div>
      <div><label htmlFor="cf-topic">{t["f.topic"]}</label>
        <select id="cf-topic" name="topic"><option>{t["f.o1"]}</option><option>{t["f.o2"]}</option><option>{t["f.o3"]}</option><option>{t["f.o4"]}</option></select>
      </div>
      <div><label htmlFor="cf-msg">{t["f.msg"]}</label><textarea id="cf-msg" name="message" required /></div>
      {error
        ? <p className="note" id="formNote" style={{ color: "var(--figure)" }}>{ui.err}</p>
        : <p className="note" id="formNote" dangerouslySetInnerHTML={{ __html: t["f.note"] }} />}
      <button className="btn" type="submit">{t["f.submit"]}</button>
      <div className="result" id="result" hidden={!draft}>
        <pre id="resultText" ref={pre}>{draft?.text}</pre>
        <div className="acts">
          <button className="btn" type="button" id="copyMsg"
            onClick={(e) => copyText(pre.current!.textContent ?? "", e.currentTarget, pre.current!, ui.copied, ui.selected)}>{t["f.copy"]}</button>
          <a className="btn ghost" id="mailLink" href={draft?.mailto ?? "#"}>{t["f.open"]}</a>
        </div>
        <p className="note">{t["f.paste"]}</p>
      </div>
    </form>
  );
}
