# momochen.org

Personal portfolio of Cheng-Mou (Momo) Chen. Next.js + TypeScript, exported as a static site and hosted on Vercel.

- English page: `/`  ·  Traditional Chinese page: `/zh/`
- The original design is kept for reference in `design/momo-portfolio.html`.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000, reloads as you edit
npm run build        # writes the finished site to out/
npm start            # serves out/ to check the built site
```

## Edit the content

All copy, links and settings live in `content/`. See [`content/README.md`](content/README.md) for details.

| To change… | Edit |
| --- | --- |
| English or Chinese wording | `content/en.json`, `content/zh.json` |
| A project, writing or certificate link (`""` hides it) | `content/links.json` |
| Email, LinkedIn, site address, Formspree form ID | `content/site.json` |
| Resume PDFs | Replace the files in `public/resume/` (keep the file names) |
| Headshot | `public/headshot.jpg` (480×600) |
| Certificate preview | `public/certificates/bmc.jpg` and `bmc.avif` |
| Header chart speed | `app/globals.css`, the `90s` in `.chart-bg{…animation:chart-shift 90s…}` |

`npm run build` also regenerates the Chinese font files from the JSON, so new Chinese characters just work. It needs an internet connection to reach Google Fonts.

## Deploy to Vercel

### 1. Put the code on GitHub

Create an empty repository on GitHub (no README or license), then:

```bash
git remote add origin https://github.com/CMOMO7581/<repo-name>.git
git push -u origin main
```

### 2. Import it into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and pick the repository.
2. Vercel detects **Next.js**. Leave the build settings at their defaults (build command `npm run build`). The static export in `next.config.ts` is handled automatically.
3. Click **Deploy**. You get a `*.vercel.app` address to check the site.

From then on, every push to `main` redeploys the site within a minute or two. Pushes to other branches get their own preview addresses.

### 3. Connect momochen.org

1. In the Vercel project, open **Settings → Domains**, add `momochen.org`, and also add `www.momochen.org` (Vercel offers to redirect one to the other).
2. **If momochen.org is already attached to another Vercel project,** remove it from that project first (that project's **Settings → Domains → Remove**), or accept Vercel's prompt to move it. A domain can belong to only one project, and the old site keeps serving until the move.
3. If the domain's DNS isn't already pointed at Vercel, Vercel shows the records to add at your registrar:
   - `momochen.org` → **A** record `76.76.21.21`
   - `www` → **CNAME** `cname.vercel-dns.com`

   Use the exact values Vercel shows, if they differ. DNS changes usually take minutes, and occasionally up to 48 hours.
4. Vercel issues the HTTPS certificate automatically once the domain shows **Valid Configuration**.

If the address ever changes, update `url` in `content/site.json`. It's used for the sharing tags, canonical links and sitemap.

## Contact form (Formspree)

The form posts to the Formspree form ID in `content/site.json`. In the Formspree dashboard for that form:

- Check that the recipient email is the inbox you want (currently the site lists cc79336@eid.utexas.edu).
- Optionally, under **Settings → Restrict to Domain**, enter `momochen.org` so only your site can submit.

If the ID is removed, the form falls back to the design's original behavior: it drafts the message for the visitor to copy or open in their email app.

Spam protection: a hidden `_gotcha` field. Submissions that fill it in are dropped without being sent.

## Check performance

After deploying, open [pagespeed.web.dev](https://pagespeed.web.dev), enter `https://momochen.org` (and `https://momochen.org/zh/`), and read the **Mobile** tab. Scores vary a few points between runs.
