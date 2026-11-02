"use client";
import { pagePath, type Lang } from "@/lib/content";

export default function LangToggle({ lang }: { lang: Lang }) {
  function go(next: Lang) {
    if (next === lang) return;
    location.href = pagePath[next] + location.hash;
  }
  return (
    <span className="lang" role="group" aria-label="Language / 語言">
      <button type="button" id="langEn" lang="en" aria-pressed={lang === "en"} onClick={() => go("en")}>EN</button>
      <button type="button" id="langZh" lang="zh-Hant" aria-pressed={lang === "zh"} onClick={() => go("zh")}>中文</button>
    </span>
  );
}
