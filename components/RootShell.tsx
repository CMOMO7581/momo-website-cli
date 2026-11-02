import type { ReactNode } from "react";
import { htmlLang, type Lang } from "@/lib/content";
import "@/app/globals.css";

// Runs before first paint so a saved theme never flashes the wrong colors.
const themeScript = `try{var t=localStorage.getItem("mc-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=La+Belle+Aurore&family=Lora:ital,wght@0,400;0,600;1,400&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Sans+TC:wght@400;600&family=Noto+Serif+TC:wght@400;600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
