"use client";
import { useRef, useState, type FormEvent } from "react";
import { copyText } from "./copyText";
import site from "@/content/site.json";
import type { Dict } from "@/lib/content";

const TO = site.email;
// With a Formspree form ID the form sends the message; without one it only drafts it, as in the design.
const ENDPOINT = site.formspreeId ? "https://formspree.io/f/" + site.formspreeId : "";

type Status = "idle" | "invalid" | "sending" | "sent" | "failed";

export default function ContactForm({ t }: { t: Dict }) {
  const ui = t.ui;
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState<{ text: string; mailto: string } | null>(null);
  const pre = useRef<HTMLPreElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    const name = get("name"), email = get("email"), msg = get("message");
    const sel = form.elements.namedItem("topic") as HTMLSelectElement;
    const topic = sel.options[sel.selectedIndex].text;
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) { setStatus("invalid"); return; }
    const subject = topic + ui.from + name;
    const body = msg + "\n\n" + name + "\n" + email;
    const prepared = {
      text: "To: " + TO + "\nSubject: " + subject + "\n\n" + body,
      mailto: "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body),
    };
    if (!ENDPOINT) { setStatus("idle"); setDraft(prepared); return; }

    // Bots fill the hidden field; pretend it worked and send nothing.
    if (get("_gotcha")) { setStatus("sent"); form.reset(); return; }
    setStatus("sending"); setDraft(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message: msg, _subject: subject }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent"); form.reset();
    } catch {
      setStatus("failed"); setDraft(prepared);
    }
  }

  let note;
  if (status === "invalid") note = <p className="note" id="formNote" role="alert" style={{ color: "var(--figure)" }}>{ui.err}</p>;
  else if (status === "failed") note = <p className="note" id="formNote" role="alert" style={{ color: "var(--figure)" }}>{t["f.fail"]}</p>;
  else if (status === "sent") note = <p className="note" id="formNote" role="status"><strong>{t["f.ok"]}</strong></p>;
  else note = <p className="note" id="formNote" dangerouslySetInnerHTML={{ __html: ENDPOINT ? t["f.note.send"] : t["f.note"] }} />;

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
      <div className="hp" aria-hidden="true"><label htmlFor="cf-hp">Leave this empty</label><input id="cf-hp" name="_gotcha" tabIndex={-1} autoComplete="off" /></div>
      {note}
      <button className="btn" type="submit" disabled={status === "sending"}>
        {!ENDPOINT ? t["f.submit"] : status === "sending" ? t["f.sending"] : t["f.send"]}
      </button>
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
