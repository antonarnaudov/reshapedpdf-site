#!/usr/bin/env node
/*
 * Render assets/og-card.html to assets/og.png at exactly 1200x630.
 *
 * The social card is the first thing anyone sees of this product — it is what a
 * link unfurls into on every platform — so it is built from the same HTML, fonts
 * and colours as the site rather than drawn once in an image editor and left to
 * drift. Edit the card, run this, commit the PNG.
 *
 * Uses the Chromium that already ships with Electron (a devDependency), so there
 * is no headless-browser download to babysit.
 *
 *   npm run og
 */
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const PORT = 9471
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// a bare Electron window pointed at the card, with the debugging port open
const bootstrap = join(ROOT, 'scripts', '.og-main.cjs')
mkdirSync(dirname(bootstrap), { recursive: true })
writeFileSync(bootstrap, `
const { app, BrowserWindow } = require('electron')
app.disableHardwareAcceleration()
app.whenReady().then(() => {
  const w = new BrowserWindow({ width: 1200, height: 630, show: false, webPreferences: { offscreen: false } })
  w.loadURL(${JSON.stringify(pathToFileURL(join(ROOT, 'assets', 'og-card.html')).href)})
})
`)

const child = spawn('npx', ['electron', bootstrap, `--remote-debugging-port=${PORT}`], {
  cwd: ROOT, detached: true, stdio: 'ignore',
})

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      const t = list.find((x) => x.type === 'page')
      if (t) return t
    } catch { /* not up yet */ }
    await sleep(500)
  }
  throw new Error('Electron never opened a debuggable page')
}

const t = await target()
const ws = new WebSocket(t.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(typeof e.data === 'string' ? e.data : Buffer.from(e.data).toString())
  if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
})
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
const send = (method, params) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })

await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 2, mobile: false })
await sleep(900) // let the variable fonts land before the shutter
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
writeFileSync(join(ROOT, 'assets', 'og.png'), Buffer.from(shot.data, 'base64'))
console.log('assets/og.png written (1200x630 @2x)')
ws.close()
try { process.kill(-child.pid, 'SIGKILL') } catch { /* already gone */ }
process.exit(0)
