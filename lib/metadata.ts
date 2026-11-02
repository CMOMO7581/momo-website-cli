import type { Metadata, Viewport } from "next";
import { content, type Lang } from "@/lib/content";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export function pageMetadata(lang: Lang): Metadata {
  const t = content[lang];
  return {
    title: t.ui.title,
    description: "Cheng-Mou (Momo) Chen: Finance student at McCombs, UT Austin, working across markets, AI, and law.",
  };
}
