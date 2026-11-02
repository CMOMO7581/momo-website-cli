"use client";
import { copyText } from "./copyText";
import type { UI } from "@/lib/content";

export default function CopyButton({ text, label, ui }: { text: string; label: string; ui: UI }) {
  return (
    <button className="copy" type="button" data-copy={text}
      onClick={(e) => {
        const b = e.currentTarget;
        copyText(text, b, b.parentElement!.querySelector(".v")!, ui.copied, ui.selected);
      }}>
      {label}
    </button>
  );
}
