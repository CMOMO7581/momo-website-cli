// Downloads the site's fonts from Google Fonts into public/fonts/ and writes lib/font-faces.json.
//
// Latin fonts keep Google's "latin" slice. The Chinese fonts are cut down to only the characters
// each page uses (from content/en.json and content/zh.json), one file per weight, so the Chinese
// page loads about 150 KB of fonts instead of megabytes.
// Run `npm run fonts` again after changing any Chinese copy.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "fonts");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

// One request per weight: Google then serves a static file per weight, about a third the size
// of the variable file it returns when several weights are requested together.
const LATIN = ["La+Belle+Aurore", "Lora:wght@400", "Lora:wght@600", "Lora:ital@1",
  "Open+Sans:wght@400", "Open+Sans:wght@600", "Open+Sans:wght@700", "Open+Sans:ital@1"];
// Chinese text that lives in components rather than content files (the 中文 toggle).
const EXTRA = "中文";
// Copy keys the CSS sets in the serif font: tagline, nav (including the Dark/Light toggle),
// headings, titles, organization lines and skill labels. Every other string is in the sans font.
const SERIF_KEYS = /^(tagline|nav\..*|.*\.h|.*\.t|.*\.o|sk\.(fin|code|tools|lang|hon)|ui\.(dark|light))$/;
// Strings shown in bold (600) as a whole: buttons, the contact status line, the sent message
// and the serif About heading.
const BOLD_KEYS = /^(about\.h|c\.status|f\.ok|r\.dl|f\.submit|f\.send|f\.sending|f\.copy|f\.open|c\.copy|ui\.(soon|copied|selected))$/;
// Inline markup shown in bold: <strong>…</strong> and the orange <span class="fig">…</span>.
const BOLD_MARKUP = /<strong>(.*?)<\/strong>|<span class=\\?"fig\\?">(.*?)<\/span>/g;

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const CJK = /[⺀-鿿豈-﫿＀-￯　-〿]/gu;
const cjk = (text) => [...new Set(text.match(CJK))].sort().join("");

async function css(query) {
  const res = await fetch("https://fonts.googleapis.com/css2?" + query + "&display=swap", { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error("Google Fonts " + res.status + " for " + query);
  return res.text();
}

// Saves each @font-face's file locally and returns the rewritten CSS plus the saved file paths.
async function localize(cssText, suffix, keep = () => true) {
  // Google labels each unicode slice with a comment such as /* latin */; keep it with its block.
  const split = cssText.includes("*/") ? /(?=\/\*[^*]+\*\/\s*@font-face)/ : /(?=@font-face)/;
  const blocks = cssText.split(split).filter((b) => b.includes("@font-face"));
  const out = [], files = [], saved = new Map();
  for (const block of blocks) {
    if (!keep(block)) continue;
    const family = block.match(/font-family:\s*'([^']+)'/)[1];
    const style = block.match(/font-style:\s*(\w+)/)[1];
    const weight = block.match(/font-weight:\s*(\d+)/)[1];
    const url = block.match(/url\((https:[^)]+)\)/)[1];
    // Variable fonts serve several weights from one file; download it once.
    let name = saved.get(url);
    if (!name) {
      name = `${slug(family)}-${weight}${style === "italic" ? "i" : ""}${suffix}.woff2`;
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      writeFileSync(path.join(outDir, name), buf);
      saved.set(url, name);
      files.push({ name, kb: Math.round(buf.length / 1024) });
    }
    out.push(block.replace(/^\/\*[^*]+\*\/\s*/, "").replace(url, "/fonts/" + name).trim());
  }
  return { css: out.join("\n"), files };
}

// Groups one language's copy by the Chinese font face that renders it.
function charSets(lang) {
  const dict = JSON.parse(readFileSync(path.join(root, "content", lang + ".json"), "utf8"));
  const { ui, ...copy } = dict;
  const entries = [...Object.entries(copy), ...Object.entries(ui).map(([k, v]) => ["ui." + k, v])];
  const text = { sans400: EXTRA, sans600: "", serif400: "", serif600: "" };
  for (const [k, v] of entries) {
    const font = SERIF_KEYS.test(k) ? "serif" : "sans";
    const bold = BOLD_KEYS.test(k) ? v : [...v.matchAll(BOLD_MARKUP)].map((m) => m[1] ?? m[2]).join("");
    text[font + "400"] += v;
    text[font + "600"] += bold;
  }
  // Any character can fall back to the sans font, so the regular sans file covers everything.
  text.sans400 += Object.values(text).join("");
  return Object.fromEntries(Object.entries(text).map(([k, v]) => [k, cjk(v)]));
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const latinCss = [], report = [];
for (const family of LATIN) {
  const r = await localize(await css("family=" + family), "", (b) => b.startsWith("/* latin */"));
  latinCss.push(r.css);
  report.push(...r.files);
}
const faces = { latin: latinCss.join("\n") };
for (const lang of ["en", "zh"]) {
  const sets = charSets(lang), parts = [];
  for (const [face, chars] of Object.entries(sets)) {
    if (!chars) continue;
    const family = face.startsWith("serif") ? "Noto+Serif+TC" : "Noto+Sans+TC";
    const r = await localize(await css(`family=${family}:wght@${face.slice(-3)}&text=${encodeURIComponent(chars)}`), "-" + lang);
    parts.push(r.css);
    report.push(...r.files);
  }
  faces[lang] = parts.join("\n");
  console.log(`${lang}: ` + Object.entries(sets).map(([f, c]) => `${f} ${c.length}`).join(", ") + " characters");
}
writeFileSync(path.join(root, "lib", "font-faces.json"), JSON.stringify(faces, null, 2) + "\n");
for (const f of report) console.log(`  ${f.name}  ${f.kb} KB`);
