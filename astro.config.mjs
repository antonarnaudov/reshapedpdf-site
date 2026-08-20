// @ts-check
import { defineConfig } from 'astro/config'

/**
 * Static output, and it stays static.
 *
 * The whole pitch of this product is that nothing leaves your machine, so the
 * page that says so has no business shipping a runtime or calling home. Astro is
 * here for components and layouts — it renders to plain HTML at build time and
 * ships no JavaScript unless a component asks for it, which none of these do.
 * The two small scripts on the download section are hand-written and inlined,
 * exactly as they were before.
 */
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
})
