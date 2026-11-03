# Editing the site's content

Everything a visitor reads is in this folder. Edit a file, then run `npm run build` (or push to GitHub and let Vercel rebuild).

| File | What's in it |
| --- | --- |
| `en.json` | All English copy |
| `zh.json` | All Traditional Chinese copy (same keys as `en.json`) |
| `links.json` | Project and writing links. Leave a link `""` to hide it. |
| `site.json` | Your site address (used for sharing tags and the sitemap), email, LinkedIn URL and Formspree form ID |

## Tips

- **Keys match between languages.** `"w1.t"` in `en.json` and `"w1.t"` in `zh.json` are the same heading in each language. When you add a key to one file, add it to the other.
- **Inline markup is allowed.** Some strings contain HTML such as `<strong>…</strong>`, `<span class="fig">10 years</span>` (the orange numbers) or `<a href="#work">work</a>`. Keep the tags balanced.
- **Escape quotes inside a string** as `\"`, for example `<a href=\"#work\">`.
- **The `ui` block** holds short interface text: button labels, the photo's alt text, the page title, the search/sharing description (`desc`) and the form's validation error.
- **Strings that are the same in both languages** (tool lists, the TULJ title, the copyright line) still appear in both files, so each file has the full page.
- **Changing your email:** update `site.json` and also the copy strings that mention it: search both JSON files for the old address (`about.p3`, `f.note`, `f.note.send`, `f.paste`, `f.fail`).

## Fonts

The Chinese fonts contain only the characters the pages use. `npm run build` regenerates them from these JSON files automatically (it needs an internet connection to reach Google Fonts). If you preview with `npm run dev` after adding new Chinese characters, run `npm run fonts` once.

## Resumes

Put the PDFs at `public/resume/Momo-Chen-Resume-EN.pdf` and `public/resume/Momo-Chen-Resume-ZH.pdf`. The Download buttons turn on automatically when the files exist at build time.
