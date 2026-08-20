# ReshapedPDF — the landing page

The landing page for [ReshapedPDF](https://github.com/antonarnaudov/reshapedpdf-app) —
a free, private PDF editor.

An [Astro](https://astro.build) site that builds to plain static files. The only
JavaScript it ships is two inline scripts: the download section's platform guess
and the scroll reveals — no framework runtime, nothing to hydrate.

```bash
npm run dev        # serve it at http://localhost:4321
npm run build      # static site into dist/
npm run og         # re-render public/assets/og.png from scripts/og-card.html
npm run app        # build the editor from ../reshapedpdf into public/app
```

## Why it is built this way

**The typefaces are self-hosted.** A page whose whole argument is "nothing leaves
your machine" has no business asking Google for its fonts, and in the EU that
request needs consent of its own. The three families live in `public/fonts/` with
their SIL Open Font Licence text beside them — both must travel together in any copy.

**No analytics, no cookies, no third-party anything.** Nothing to disclose is a
better privacy policy than a good one, which is what the privacy page says.

**Every fact the page states lives in `src/data/site.ts`.** Download formats,
feature claims, FAQ answers — one source, so the platform-detect banner and the
download cards can no longer disagree about what CI actually publishes.

**The demos are CSS, the screenshot is real.** The animated invoice, eraser and
redaction demos are hand-choreographed CSS on white "paper"; the editor image in
the hero is an actual capture of the app with its sample document open — not a
mock-up, because the product is better-looking than a mock-up would be.

**The social card is generated from HTML** (`scripts/render-og.mjs` renders
`scripts/og-card.html` through the Chromium that ships with Electron), so it uses
the same colours and type as the site instead of drifting away from them in an
image editor.

## The web app at /app

ReshapedPDF's browser build is the *same code* as the desktop app compiled to
static files — no server, no API — so "try it in your browser" is the product,
not a demo. `./scripts/sync-app.sh` copies that build in from the app repo.

`public/app/` is deliberately **gitignored**, and the app repo is deliberately
**not a dependency** of this one: a marketing site that cannot deploy because the
editor failed to compile is a bad trade. If `public/app/` is absent the site
still deploys and the "web app" link simply has nothing behind it.

## Deploying

Any static host that can serve `dist/`. `vercel.json` is here with cache and
security headers set; GitHub Pages needs no configuration at all.

## Licence

MIT for the code and content — see [LICENSE](./LICENSE). The fonts are OFL and
the name "ReshapedPDF" is a trademark; both are covered in that file.
