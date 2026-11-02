import en from "@/content/en.json";
import zh from "@/content/zh.json";

export type Lang = "en" | "zh";
export type Dict = typeof en;
export type Key = Exclude<keyof Dict, "ui">;
export type UI = Dict["ui"];

export const content: Record<Lang, Dict> = { en, zh };

export const htmlLang: Record<Lang, string> = { en: "en", zh: "zh-Hant" };
export const pagePath: Record<Lang, string> = { en: "/", zh: "/zh/" };
