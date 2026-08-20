/**
 * The facts the page states, in one place.
 *
 * These were scattered through the markup as literal strings, which is how the
 * Linux download card came to promise .rpm and .tar.gz builds that CI has never
 * produced — the card said one thing and the platform-detect script said another,
 * because they were edited on different days. One source, two readers.
 */
export const REPO = 'https://github.com/antonarnaudov/reshapedpdf-app'
export const LATEST = `${REPO}/releases/latest`
export const CONTACT = 'anton.arnaudov.pro@gmail.com'

export interface Platform {
  id: 'mac' | 'win' | 'linux'
  name: string
  /** the download card */
  formats: string
  requires: string
  /** what the browser-detected banner says when this is the guess */
  pickLabel: string
  pickBtn: string
  pickSub: string
}

export const PLATFORMS: Platform[] = [
  {
    id: 'mac',
    name: 'macOS',
    formats: 'Apple Silicon & Intel · .dmg, .zip',
    requires: 'macOS 11+',
    pickLabel: 'Recommended for your Mac',
    pickBtn: 'Download for macOS',
    pickSub: 'Apple Silicon and Intel builds are both on the release page · macOS 11+',
  },
  {
    id: 'win',
    name: 'Windows',
    formats: 'x64 & ARM64 · .exe installer',
    requires: 'Windows 10 & 11',
    pickLabel: 'Recommended for your PC',
    pickBtn: 'Download for Windows',
    pickSub: 'x64 and ARM64 installers · Windows 10 & 11',
  },
  {
    id: 'linux',
    name: 'Linux',
    formats: '.AppImage (x86-64 & ARM64), .deb (x86-64)',
    requires: 'glibc 2.28+',
    pickLabel: 'Recommended for your machine',
    pickBtn: 'Download for Linux',
    pickSub: 'AppImage (x86-64 & ARM64) and .deb (x86-64) · glibc 2.28+',
  },
]

export interface Feature { em: string; title: string; body: string }

export const FEATURES: Feature[] = [
  { em: 'FILL & SIGN', title: 'Forms that stay alive',
    body: 'Fill text fields, checkboxes, radios and dropdowns. Export keeps them interactive — or flatten to permanent ink. Draw, type or upload your signature once, reuse forever.' },
  { em: 'RETYPE IN PLACE', title: 'Change the words, keep the look',
    body: 'Select any printed text and edit it — the result is recomposed from the document’s own letterforms, so it stays pixel-faithful. Fix a typo, swap a name or a date, and no one can tell.' },
  { em: 'FONT MATCHING', title: 'Nine faces, really embedded',
    body: 'Added and edited text is set in a real font matched to the print — sans, serif, mono, geometric, humanist, condensed, rounded, slab or grotesk — embedded on export. Latin text stays real, selectable type; Cyrillic, Greek and CJK are drawn through a crisp 3× raster so they look right on any reader, at the cost of being selectable.' },
  { em: 'TRUE REDACTION', title: 'Gone, not hidden',
    body: 'With “true redaction” ticked on export, covered content is removed from the page’s own drawing program — not a black box a journalist can copy-paste under. Leave it unticked and the box is only a box.' },
  { em: 'PAGE SURGERY', title: 'Merge, split, reorder',
    body: 'Drag pages between positions, rotate scans, extract ranges, merge whole files, stamp page numbers. Annotations ride along.' },
  { em: 'MAGIC ERASER', title: 'Rub anything out',
    body: 'Paint over a stamp, a watermark, handwriting on a scan — the background underneath is rebuilt: gradients, textures, coloured bands and all. Not a white box. Fully local. Erase a box and the covered words leave the file too — unless they live in a drawing two pages share, when they are covered instead and the export tells you; the freehand brush only covers pixels, so use Redact when removal has to be provable.' },
  { em: 'EVERYWHERE', title: 'Desktop and browser',
    body: 'Native app for macOS, Windows and Linux — and the exact same editor as a web app on any device. Files never upload anywhere.' },
  { em: 'FAST HANDS', title: 'Built for keyboards',
    body: '⌘K command palette, one-key tools, full-text search, multi-document tabs, deep undo. The pros’ pace without the pros’ price.' },
]

export interface Step { n: string; title: string; body: string; kbd?: string }

export const STEPS: Step[] = [
  { n: '01', title: 'Press', kbd: 'R', body: 'Pick the AI edit tool and drag over any printed line — a date, a price, a name.' },
  { n: '02', title: 'It reads the print', body: 'Your model transcribes the text and identifies the type style. The patch matches the paper.' },
  { n: '03', title: 'You retype', body: 'Change the words. It’s rebuilt from the page’s own letters — or a matched embedded font — so it looks like it was always there.' },
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
