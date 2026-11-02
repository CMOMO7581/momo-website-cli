import { existsSync } from "node:fs";
import path from "node:path";
import type { ElementType, ComponentPropsWithoutRef } from "react";
import ChartBg from "./ChartBg";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import CopyButton from "./CopyButton";
import ContactForm from "./ContactForm";
import { content, type Key, type Lang } from "@/lib/content";

const EMAIL = "cc79336@eid.utexas.edu";
const LINKEDIN = "https://www.linkedin.com/in/momochen0517";

const RESUMES = { en: "/resume/Momo-Chen-Resume-EN.pdf", zh: "/resume/Momo-Chen-Resume-ZH.pdf" };

// Checked at build time: a button only becomes a download once its PDF is in public/resume/.
const hasFile = (href: string) => existsSync(path.join(process.cwd(), "public", href));

const doc = <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><path d="M10 4h14l8 8v24H10z"/><path d="M24 4v8h8"/><path d="M15 19h12M15 24h12M15 29h8"/></svg>;

export default function Portfolio({ lang }: { lang: Lang }) {
  const t = content[lang];

  function ResumeButton({ which }: { which: keyof typeof RESUMES }) {
    const href = RESUMES[which];
    if (!hasFile(href)) return <a className="btn" aria-disabled="true">{t.ui.soon}</a>;
    return <T as="a" className="btn" href={href} download k="r.dl" />;
  }

  // Renders a copy string (which may contain inline markup) inside the given tag.
  function T<E extends ElementType = "span">({ k, as, ...rest }: { k: Key; as?: E } & ComponentPropsWithoutRef<E>) {
    const Tag: ElementType = as ?? "span";
    return <Tag {...rest} dangerouslySetInnerHTML={{ __html: t[k] }} />;
  }

  return (
    <>
      <div className="masthead" id="masthead" data-pattern="chart">
        <ChartBg />
        <div className="page head-inner">
          <header className="top" id="top">
            <div>
              <a className="sig" href="#top">Momo Chen</a>
              <T as="p" className="tagline" k="tagline" />
            </div>
            <nav aria-label="Primary">
              <ul>
                <li><T as="a" href="#work" k="nav.work" /></li>
                <li><T as="a" href="#experience" k="nav.exp" /></li>
                <li><T as="a" href="#writing" k="nav.writing" /></li>
                <li><T as="a" href="#resume" k="nav.resume" /></li>
                <li><T as="a" href="#contact" k="nav.contact" /></li>
                <li><ThemeToggle ui={t.ui} /></li>
                <li><LangToggle lang={lang} /></li>
              </ul>
            </nav>
          </header>
        </div>
      </div>

      <div className="page">
        <main>
          <section className="intro" id="about">
            <T as="h1" k="about.h" />
            <div className="intro-grid">
              <div>
                <T as="p" k="about.p1" />
                <T as="p" k="about.p2" />
                <T as="p" k="about.p3" />
                <T as="p" className="facts num" k="about.facts" />
              </div>
              <figure>
                <img className="photo" id="photo" src="/headshot.jpg" width={480} height={600} alt={t.ui.alt} />
                <T as="figcaption" k="fig.cap" />
              </figure>
            </div>
          </section>

          <hr />

          <section id="work">
            <T as="h2" k="work.h" />

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 6v28h28"/><path d="M10 27l6-7 5 4 6-9 5 4"/><circle cx="16" cy="20" r="1.2"/><circle cx="27" cy="15" r="1.2"/><path d="M10 31h4M18 31h4M26 31h4" opacity=".5"/></svg>
              <div>
                <T as="p" className="kicker" k="w1.k" />
                <T as="h3" k="w1.t" />
                <T as="p" k="w1.lead" />
                <ul>
                  <T as="li" k="w1.b1" />
                  <T as="li" k="w1.b2" />
                </ul>
                <T as="p" className="tools" k="w1.tools" />
                <p className="links"><T as="a" href="#" k="l.code" /><T as="a" href="#" k="l.report" /></p>
              </div>
            </article>

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 32c6 0 6-8 12-8s6-8 12-8"/><circle cx="6" cy="32" r="2"/><circle cx="18" cy="24" r="2"/><circle cx="30" cy="16" r="2"/><path d="M30 16V6l5 2.5-5 2.5"/></svg>
              <div>
                <T as="p" className="kicker" k="w2.k" />
                <T as="h3" k="w2.t" />
                <T as="p" k="w2.lead" />
                <ul>
                  <T as="li" k="w2.b1" />
                  <T as="li" k="w2.b2" />
                </ul>
                <T as="p" className="tools" k="w2.tools" />
                <p className="links"><T as="a" href="#" k="l.live" /><T as="a" href="#" k="l.code" /></p>
              </div>
            </article>

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="5"/><circle cx="7" cy="9" r="3"/><circle cx="33" cy="9" r="3"/><circle cx="7" cy="31" r="3"/><circle cx="33" cy="31" r="3"/><path d="M9.3 11l6.8 5.6M30.7 11l-6.8 5.6M9.3 29l6.8-5.6M30.7 29l-6.8-5.6"/></svg>
              <div>
                <T as="p" className="kicker" k="w3.k" />
                <T as="h3" k="w3.t" />
                <T as="p" k="w3.lead" />
                <ul>
                  <T as="li" k="w3.b1" />
                  <T as="li" k="w3.b2" />
                </ul>
                <T as="p" className="tools" k="w3.tools" />
                <p className="links"><T as="a" href="#" k="l.case" /></p>
              </div>
            </article>

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><rect x="5" y="6" width="24" height="28" rx="1"/><path d="M10 13h14M10 18h10M10 23h8"/><circle cx="27" cy="25" r="6"/><path d="M31.5 29.5L36 34"/></svg>
              <div>
                <T as="p" className="kicker" k="w4.k" />
                <T as="h3" k="w4.t" />
                <T as="p" k="w4.lead" />
                <T as="p" className="tools" k="w4.tools" />
                <p className="links"><T as="a" href="#" k="l.deck" /></p>
              </div>
            </article>
          </section>

          <hr />

          <section id="experience">
            <T as="h2" k="exp.h" />
            <ol className="entries">
              <li><T as="div" className="when" k="e1.w" /><div><T as="h3" k="e1.t" /><p className="org">Texas Marketrics</p><T as="p" k="e1.d" /></div></li>
              <li><T as="div" className="when" k="e2.w" /><div><T as="h3" k="e2.t" /><T as="p" className="org" k="e2.o" /><T as="p" k="e2.d" /></div></li>
              <li><T as="div" className="when" k="e3.w" /><div><T as="h3" k="e3.t" /><T as="p" className="org" k="e3.o" /><T as="p" k="e3.d" /></div></li>
              <li><T as="div" className="when" k="e4.w" /><div><T as="h3" k="e4.t" /><T as="p" className="org" k="e4.o" /><T as="p" k="e4.d" /></div></li>
            </ol>
          </section>

          <hr />

          <section id="writing">
            <T as="h2" k="wr.h" />
            <ol className="entries">
              <li><T as="div" className="when" k="wr1.w" /><div><h3><T as="a" href="#" k="wr1.t" /></h3><T as="p" className="org" k="wr1.o" /><T as="p" k="wr1.d" /></div></li>
              <li><T as="div" className="when" k="wr2.w" /><div><h3><T as="a" href="#" k="wr2.t" /></h3><T as="p" className="org" k="wr2.o" /><T as="p" k="wr2.d" /></div></li>
              <li><T as="div" className="when" k="wr3.w" /><div><h3><T as="a" href="#" k="wr3.t" /></h3><T as="p" className="org" k="wr3.o" /><T as="p" k="wr3.d" /></div></li>
            </ol>
          </section>

          <hr />

          <section id="skills">
            <T as="h2" k="sk.h" />
            <dl className="skills">
              <T as="dt" k="sk.fin" /><T as="dd" k="sk.fin.v" />
              <T as="dt" k="sk.code" /><T as="dd" k="sk.code.v" />
              <T as="dt" k="sk.tools" /><T as="dd" k="sk.tools.v" />
              <T as="dt" k="sk.lang" /><T as="dd" k="sk.lang.v" />
              <T as="dt" k="sk.hon" /><T as="dd" className="num" k="sk.hon.v" />
            </dl>
          </section>

          <hr />

          <section id="resume">
            <T as="h2" k="r.h" />
            <T as="p" k="r.p" />
            <div className="resumes">
              <div className="resume-opt">
                {doc}
                <div>
                  <T as="h3" lang="en" k="r.en.t" />
                  <T as="p" className="meta" k="r.en.m" />
                  <ResumeButton which="en" />
                </div>
              </div>
              <div className="resume-opt">
                {doc}
                <div>
                  <T as="h3" lang="zh-Hant" k="r.zh.t" />
                  <T as="p" className="meta" k="r.zh.m" />
                  <ResumeButton which="zh" />
                </div>
              </div>
            </div>
          </section>

          <hr />

          <section id="contact">
            <T as="h2" k="c.h" />
            <p><T as="strong" k="c.status" /></p>
            <ul className="channels">
              <li><T className="k" k="c.email" /><span className="v">{EMAIL}</span><CopyButton text={EMAIL} label={t["c.copy"]} ui={t.ui} /></li>
              <li><span className="k">LinkedIn</span><a className="v" href={LINKEDIN} target="_blank" rel="noopener">linkedin.com/in/momochen0517</a></li>
            </ul>

            <ContactForm t={t} />
          </section>

          <hr />
        </main>

        <footer>
          <T as="p" k="ft.ps" />
          <p dangerouslySetInnerHTML={{ __html: t["ft.copy"] + ` · <a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>` }} />
        </footer>
      </div>
    </>
  );
}
