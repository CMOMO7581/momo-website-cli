"use client";
import { useEffect, useState } from "react";
import type { UI } from "@/lib/content";

function current() {
  const t = document.documentElement.getAttribute("data-theme");
  if (t) return t;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle({ ui }: { ui: UI }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const sync = () => setTheme(current());
    sync();
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  function toggle() {
    const next = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try { localStorage.setItem("mc-theme", next); } catch {}
  }
  return (
    <button className="theme" id="themeToggle" type="button" onClick={toggle}>
      {theme === "dark" ? ui.light : ui.dark}
    </button>
  );
}
