import type { MetadataRoute } from "next";
import site from "@/content/site.json";
import { pagePath } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: site.url + pagePath.en, "zh-Hant": site.url + pagePath.zh };
  return [pagePath.en, pagePath.zh].map((p) => ({ url: site.url + p, alternates: { languages } }));
}
