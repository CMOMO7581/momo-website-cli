import type { ReactNode } from "react";
import { htmlLang, type Lang } from "@/lib/content";
import fontFaces from "@/lib/font-faces.json";
import "@/app/globals.css";

// Runs before first paint so a saved theme never flashes the wrong colors.
const themeScript = `try{var t=localStorage.getItem("mc-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

// Sends a returning visitor to the language they last picked with the EN/中文 toggle.
const langScript = (lang: Lang) =>
  `try{var l=localStorage.getItem("mc-lang");if(l&&l!==${JSON.stringify(lang)}&&(l==="en"||l==="zh"))location.replace((l==="zh"?"/zh/":"/")+location.hash)}catch(e){}`;

// Fonts used above the fold, fetched early so text doesn't reflow when they arrive.
const latinPreload = ["open-sans-400.woff2", "open-sans-600.woff2", "lora-400.woff2", "lora-600.woff2", "la-belle-aurore-400.woff2"];
const preload: Record<Lang, string[]> = {
  en: latinPreload,
  zh: [...latinPreload, "noto-sans-tc-400-zh.woff2", "noto-sans-tc-600-zh.woff2", "noto-serif-tc-400-zh.woff2"],
};

export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript(lang) + themeScript }} />
        {/* Self-hosted fonts (see scripts/fetch-fonts.mjs); each language loads its own Chinese subset. */}
        {preload[lang].map((f) => <link key={f} rel="preload" href={"/fonts/" + f} as="font" type="font/woff2" crossOrigin="" />)}
        <style dangerouslySetInnerHTML={{ __html: fontFaces.latin + "\n" + fontFaces[lang] }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
