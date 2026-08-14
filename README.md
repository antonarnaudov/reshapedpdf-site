# reshapedpdf.com

The landing page for [ReshapedPDF](https://github.com/antonarnaudov/reshapedpdf) —
a free, private PDF editor.

Static HTML. No build step, no framework, no dependencies to rot. Open
`index.html` in a browser and that is the site.

```bash
npm run dev        # serve it at http://localhost:4173
npm run og         # re-render assets/og.png from assets/og-card.html
npm run app        # build the editor from ../reshapedpdf into ./app
```

## Why it is built this way

**The typefaces are self-hosted.** A page whose whole argument is "nothing leaves
your machine" has no business asking Google for its fonts, and in the EU that
request needs consent of its own. The three families live in `fonts/` with their
SIL Open Font Licence text beside them — both must travel together in any copy.

**No analytics, no cookies, no third-party anything.** Nothing to disclose is a
better privacy policy than a good one, which is what `privacy.html` says.

**The social card is generated from HTML** (`scripts/render-og.mjs` renders
`assets/og-card.html` through the Chromium that ships with Electron), so it uses
the same colours and type as the site instead of drifting away from them in an
image editor.

## The web app at /app

ReshapedPDF's browser build is the *same code* as the desktop app compiled to
static files — no server, no API — so "try it in your browser" is the product,
not a demo. `./scripts/sync-app.sh` copies that build in from the app repo.

`app/` is deliberately **gitignored**, and the app repo is deliberately **not a
dependency** of this one: a marketing site that cannot deploy because the editor
failed to compile is a bad trade. If `app/` is absent the site still deploys and
the "web app" link simply has nothing behind it.

## Deploying

Any static host. `vercel.json` and `netlify.toml` are both here with cache and
security headers set; GitHub Pages needs no configuration at all.

## Licence

MIT for the code and content — see [LICENSE](./LICENSE). The fonts are OFL and
the name "ReshapedPDF" is a trademark; both are covered in that file.
