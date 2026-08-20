/**
 * The facts the page states, in one place.
 *
 * These were scattered through the markup as literal strings, which is how the
 * Linux download card came to promise .rpm and .tar.gz builds that CI has never
 * produced — the card said one thing and the platform-detect script said another,
 * because they were edited on different days. One source, two readers.
 *
 * Every claim here traces to the app's README or to the app itself. Nothing on
 * this page may say something the app does not do — the git log of this repo is
 * mostly the story of removing sentences that did.
 */
export const REPO = 'https://github.com/antonarnaudov/reshapedpdf-app'
export const LATEST = `${REPO}/releases/latest`
export const CONTACT = 'anton.arnaudov.pro@gmail.com'

/**
 * The download matrix, one column per OS.
 *
 * Every button points at the latest-release PAGE, not at individual files:
 * the app's electron-builder artifactName embeds ${version}, so there is no
 * stable `releases/latest/download/<file>` URL to link — it would rot the day
 * after the next release. The moment CI publishes versionless asset names,
 * these entries grow per-file hrefs and nothing else has to change.
 */
export interface DownloadColumn {
  id: 'mac' | 'win' | 'linux'
  name: string
  icon: 'apple' | 'windows' | 'linux'
  req: string
  /** the emphasised build on top */
  primary: { label: string; sub: string }
  /** the other published formats, as smaller buttons */
  alts: string[]
  /** the one-time first-launch hurdle (builds are not code-signed yet) */
  unblock: { label: string; prompt?: string; cmd?: string }
}

export const DOWNLOADS: DownloadColumn[] = [
  {
    id: 'mac',
    name: 'macOS',
    icon: 'apple',
    req: 'macOS 11 or later',
    primary: { label: 'Apple Silicon', sub: '.dmg' },
    alts: ['Intel', '.zip'],
    unblock: {
      label: 'Blocked on first open? System Settings → Privacy & Security → Open Anyway — or clear the quarantine:',
      prompt: '$',
      cmd: 'xattr -dr com.apple.quarantine /Applications/ReshapedPDF.app',
    },
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'linux',
    req: 'glibc 2.28+ · x86-64 · arm64',
    primary: { label: 'AppImage', sub: 'x86-64 · arm64' },
    alts: ['.deb (x86-64)'],
    unblock: {
      label: 'Make the AppImage executable, then run it:',
      prompt: '$',
      cmd: 'chmod +x ReshapedPDF-*.AppImage',
    },
  },
  {
    id: 'win',
    name: 'Windows',
    icon: 'windows',
    req: 'Windows 11 / 10 · x64 & ARM64',
    primary: { label: 'x64', sub: '.exe installer' },
    alts: ['ARM64'],
    unblock: {
      label: 'SmartScreen will warn once — “More info” → “Run anyway”.',
    },
  },
]

/** The proof strip under the hero: the five facts that qualify everything else. */
export const PROOFS: string[] = [
  'Open source · MIT',
  'No account, ever',
  'Files never leave your machine',
  'AI optional — bring your own model',
  'Free for everything local',
]

export interface Feature { em: string; title: string; body: string }

/** The compact grid: everything that is not one of the three headline acts. */
export const FEATURES: Feature[] = [
  { em: 'FILL & SIGN', title: 'Forms that stay alive',
    body: 'Fill text fields, checkboxes, radios and dropdowns. Export keeps them interactive — or flatten to permanent ink. Draw, type or upload your signature once, reuse forever.' },
  { em: 'PAGE SURGERY', title: 'Merge, split, reorder',
    body: 'Drag pages between positions, rotate scans, extract ranges, merge whole files, stamp page numbers. Annotations ride along.' },
  { em: 'NINE REAL FACES', title: 'Fonts, really embedded',
    body: 'Added and edited text is set in a real font matched to the print — sans, serif, mono, geometric, humanist, condensed, rounded, slab or grotesk — embedded on export. Latin stays selectable type; Cyrillic, Greek and CJK are drawn through a crisp 3× raster instead.' },
  { em: 'FAST HANDS', title: 'Built for keyboards',
    body: '⌘K command palette, one-key tools, full-text search, multi-document tabs, deep undo. The pros’ pace without the pros’ price.' },
  { em: 'EVERYWHERE', title: 'Desktop and browser',
    body: 'Native app for macOS, Windows and Linux — and the exact same editor as a web app on any device. No install, no upload, same code.' },
  { em: 'PRIVATE BY WIRING', title: 'No server to leak to',
    body: 'The editor is static files; your document opens in your browser’s memory and stays there. No account, no telemetry, no upload endpoint to send it to — read the privacy page in one minute.' },
]

export interface Step { n: string; title: string; body: string; kbd?: string }

export const STEPS: Step[] = [
  { n: '01', title: 'Press', kbd: 'R', body: 'Drag over any printed line — a date, a price, a name. Digital text needs no model at all; a vision model lets even scans read.' },
  { n: '02', title: 'It reads the print', body: 'The text is transcribed and its type style identified — face, size, color. The patch matches the paper.' },
  { n: '03', title: 'You retype', body: 'Change the words. The line is rebuilt from the page’s own letterforms — or a matched embedded font — so it looks like it was always there.' },
]

export interface Provider { label: string; kind?: 'local' | 'soon' }

export const PROVIDERS: Provider[] = [
  { label: 'Ollama — free, offline', kind: 'local' },
  { label: 'LM Studio — local', kind: 'local' },
  { label: 'OpenAI key' },
  { label: 'Gemini key' },
  { label: 'Any OpenAI-compatible endpoint' },
  { label: 'ReshapedPDF Cloud — soon', kind: 'soon' },
]

/** The price, typeset as what it is: an invoice with nothing on it. */
export interface InvoiceLine { item: string; amount: string }

export const INVOICE_LINES: InvoiceLine[] = [
  { item: 'Fill, sign & annotate', amount: '0.00' },
  { item: 'Retype printed text — matched & embedded', amount: '0.00' },
  { item: 'Erase, retouch & lift objects off the page', amount: '0.00' },
  { item: 'True redaction', amount: '0.00' },
  { item: 'Merge, split, reorder, stamp', amount: '0.00' },
  { item: 'Desktop apps — macOS, Windows, Linux', amount: '0.00' },
  { item: 'The same editor, in your browser', amount: '0.00' },
  { item: 'Updates', amount: '0.00' },
]

export interface Faq { q: string; a: string }

/** Answers may carry <a>, <b>, <code> — they are rendered with set:html. */
export const FAQS: Faq[] = [
  {
    q: 'Where do my files go?',
    a: `Nowhere. There is no server, no account and no telemetry — the editor is static files and your document opens in your machine's memory. The only thing that can ever leave is the crop of a page you hand to an AI model <b>you</b> connected, and a local model keeps even that at home. The <a href="/privacy">privacy page</a> is a one-minute read because there is not much to say.`,
  },
  {
    q: 'Do I need an AI model?',
    a: `No. Retyping digital text, erasing, retouching, redaction, forms, signatures and page surgery all run with no model connected. A vision model adds three things: reading <b>scanned</b> print so you can retype it, blending added content into the print, and peeling a scan into editable layers. Bring your own — a local Ollama or LM Studio, an OpenAI or Gemini key, or any OpenAI-compatible endpoint.`,
  },
  {
    q: 'Why is it free? What is the catch?',
    a: `The editor is MIT-licensed open source, built on pdf.js and pdf-lib, and everything that runs on your machine is free forever — that is the licence, not a promotion. The one thing that will ever cost money is <b>ReshapedPDF Cloud</b>, an optional hosted blending model for people who would rather not set one up. That subscription is what keeps the editor free.`,
  },
  {
    q: 'macOS says the app is damaged. Windows warns me.',
    a: `The builds are not code-signed yet — certificates are on the list, and a free tool today beat waiting for them. On <b>macOS 15+</b>: open it once, let it be blocked, then System&nbsp;Settings → Privacy&nbsp;&amp;&nbsp;Security → <b>Open Anyway</b> (Apple removed the old right-click trick). Or in a terminal: <code>xattr -dr com.apple.quarantine /Applications/ReshapedPDF.app</code>. On <b>macOS 14 and earlier</b>: right-click → Open → Open. On <b>Windows</b>: SmartScreen → More info → Run anyway. On <b>Linux</b>: <code>chmod +x ReshapedPDF-*.AppImage</code>.`,
  },
  {
    q: 'Can I verify what I downloaded?',
    a: `Every installer is built by CI from the public repository and attached to the GitHub release with a <code>SHA256SUMS.txt</code> beside it. Verify with <code>shasum -a 256 --ignore-missing -c SHA256SUMS.txt</code> — on Windows, <code>certutil -hashfile &lt;file&gt; SHA256</code>. The file lists every platform's build, so without <code>--ignore-missing</code> it reports the ones you did not download as failures.`,
  },
]
