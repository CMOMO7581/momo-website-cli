import type { Metadata, Viewport } from "next";
import { content, pagePath, type Lang } from "@/lib/content";
import site from "@/content/site.json";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const languages = { en: pagePath.en, "zh-Hant": pagePath.zh, "x-default": pagePath.en };

export function pageMetadata(lang: Lang): Metadata {
  const t = content[lang];
  const image = { url: "/headshot.jpg", width: 480, height: 600, alt: t.ui.alt };
  return {
    metadataBase: new URL(site.url),
    title: t.ui.title,
    description: t.ui.desc,
    alternates: { canonical: pagePath[lang], languages },
    openGraph: {
      type: "website",
      url: pagePath[lang],
      siteName: "Momo Chen",
      title: t.ui.title,
      description: t.ui.desc,
      locale: lang === "zh" ? "zh_TW" : "en_US",
      alternateLocale: lang === "zh" ? "en_US" : "zh_TW",
      images: [image],
    },
    twitter: { card: "summary", title: t.ui.title, description: t.ui.desc, images: [image] },
  };
}
