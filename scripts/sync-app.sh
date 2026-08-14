#!/usr/bin/env bash
#
# Put the editor itself at /app on this site.
#
# ReshapedPDF's browser build is the SAME code as the desktop app, compiled to
# static files — no server, no API. So "try it in your browser" is not a demo or a
# trimmed-down version: it is the product, served from this domain. That is worth
# a lot on a landing page, and it costs one copy step.
#
# The build lives in the app repo, which is deliberately NOT a dependency of this
# one: a marketing site that cannot deploy because the app failed to compile is a
# bad trade. So this is a script you run, and app/ is gitignored — if it is
# missing, the site still deploys and the "web app" link is simply absent.
#
#   ./scripts/sync-app.sh [path-to-app-repo]     # default: ../reshapedpdf
#
set -euo pipefail

SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP="${1:-$(cd "$SITE/.." && pwd)/reshapedpdf}"

if [ ! -f "$APP/package.json" ]; then
  echo "No app repo at $APP" >&2
  echo "Pass the path: ./scripts/sync-app.sh ../reshapedpdf" >&2
  exit 1
fi

echo "Building the editor from $APP …"
(cd "$APP" && npm run build)

rm -rf "$SITE/app"
cp -R "$APP/dist" "$SITE/app"
echo "→ $SITE/app  ($(du -sh "$SITE/app" | cut -f1)) — the site now serves the editor at /app"
